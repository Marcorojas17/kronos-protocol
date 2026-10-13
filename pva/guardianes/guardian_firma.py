# GUARDIAN 3: FIRMA - WebhookSignatureValidator blindado
import hmac, hashlib
class GuardianFirma:
    def __init__(self, secret): self.secret=secret.encode()
    def validar(self, payload, signature):
        esperado = hmac.new(self.secret, payload, hashlib.sha256).hexdigest()
        return hmac.compare_digest(esperado, signature)
