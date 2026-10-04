"""API HTTP de KRONOS. Creado por Marco Antonio Rojas Valdovinos."""
from __future__ import annotations

import base64
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT / "src"))

from flask import Flask, jsonify, request

from kronos360.crypto.audit_log import AuditLogger
from kronos360.crypto.guard import RateLimiter, TimeoutError_, timeout
from kronos360.crypto.signatures import (
    Ed25519Signer,
    build_signed_message,
    verify_signature,
)

from apps.api.schemas import ValidationError, validate_verify_request

VERSION = "1.0.0"
ALGORITHMS_SUPPORTED = ("Ed25519", "ML-DSA-65")

ADMIN_KEY = os.environ.get("KRONOS_ADMIN_KEY")
AUDIT_PATH = Path(os.environ.get("KRONOS_AUDIT_PATH", "audit.jsonl"))
RATE_CAPACITY = int(os.environ.get("KRONOS_RATE_CAPACITY", "30"))
RATE_REFILL = float(os.environ.get("KRONOS_RATE_REFILL", "5.0"))
VERIFY_TIMEOUT = float(os.environ.get("KRONOS_VERIFY_TIMEOUT", "2.0"))

app = Flask(__name__)
limiter = RateLimiter(capacity=RATE_CAPACITY, refill_per_second=RATE_REFILL)
audit = AuditLogger(AUDIT_PATH)


def _client_key() -> str:
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.remote_addr or "unknown"


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "version": VERSION,
        "algorithms": list(ALGORITHMS_SUPPORTED),
    })


@app.route("/verify", methods=["POST"])
def verify():
    key = _client_key()
    if not limiter.try_consume(key):
        audit.log_verify(
            algorithm="rate-limited",
            public_key_hex="",
            result="rate_limited",
        )
        return jsonify({"status": "ERROR", "error": "rate limit"}), 429

    try:
        payload = validate_verify_request(request.get_json(silent=True))
    except ValidationError as e:
        return jsonify({"status": "ERROR", "error": str(e)}), 400

    algorithm = payload["algorithm"]
    public_key_hex = payload["public_key_hex"]

    try:
        with timeout(seconds=VERIFY_TIMEOUT):
            ok = verify_signature(
                algorithm=algorithm,
                public_key_hex=public_key_hex,
                signature_hex=payload["signature_hex"],
                message=payload["message"],
            )
    except TimeoutError_:
        return jsonify({"status": "ERROR", "error": "timeout"}), 504

    status = "VERIFICADO" if ok else "NO_AUTORIZADO"
    audit.log_verify(
        algorithm=algorithm,
        public_key_hex=public_key_hex,
        result="ok" if ok else "fail",
    )
    return jsonify({"status": status, "algorithm": algorithm}), 200


@app.route("/sign", methods=["POST"])
def sign():
    if not ADMIN_KEY or request.headers.get("X-Admin-Key", "") != ADMIN_KEY:
        return jsonify({"status": "ERROR", "error": "no autorizado"}), 401

    data = request.get_json(silent=True)
    if not isinstance(data, dict) or not isinstance(data.get("hash_registro"), str):
        return jsonify({"status": "ERROR", "error": "falta hash_registro"}), 400

    signer = Ed25519Signer(signer_id="api-signer")
    msg = build_signed_message(hash_registro=data["hash_registro"], alg_id="Ed25519")
    signature = signer.sign(msg)

    audit.log_sign(
        signer_id="api-signer",
        public_key_hex=signer.public_key_hex(),
        result="ok",
    )
    return jsonify({
        "status": "OK",
        "algorithm": "Ed25519",
        "public_key": signer.public_key_hex(),
        "signature": signature.hex(),
        "message_b64": base64.b64encode(msg).decode("ascii"),
    }), 200


@app.errorhandler(404)
def not_found(_):
    return jsonify({"status": "ERROR", "error": "no encontrado"}), 404


@app.errorhandler(500)
def internal_error(_):
    return jsonify({"status": "ERROR", "error": "interno"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port)