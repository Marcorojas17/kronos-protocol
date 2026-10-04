"""Rate limiting y timeouts.

Rate limiter: token bucket thread-safe, por proceso.
Timeout: SIGALRM en hilo principal. No-op en Windows o hilos secundarios.

Creado por: Marco Antonio Rojas Valdovinos (#000)
"""
from __future__ import annotations

import signal
import threading
import time
from contextlib import contextmanager
from dataclasses import dataclass, field
from typing import Iterator


@dataclass
class _Bucket:
    tokens: float
    last_refill: float


@dataclass
class RateLimiter:
    capacity: int = 10
    refill_per_second: float = 1.0
    max_buckets: int = 10_000
    _buckets: dict = field(default_factory=dict, init=False)
    _lock: threading.Lock = field(default_factory=threading.Lock, init=False)

    def __post_init__(self) -> None:
        if self.capacity <= 0:
            raise ValueError("capacity debe ser > 0")
        if self.refill_per_second <= 0:
            raise ValueError("refill_per_second debe ser > 0")
        if self.max_buckets <= 0:
            raise ValueError("max_buckets debe ser > 0")

    def _refill(self, bucket: _Bucket, now: float) -> None:
        elapsed = now - bucket.last_refill
        if elapsed <= 0:
            return
        bucket.tokens = min(
            float(self.capacity),
            bucket.tokens + elapsed * self.refill_per_second,
        )
        bucket.last_refill = now

    def _evict_oldest_if_needed(self) -> None:
        if len(self._buckets) < self.max_buckets:
            return
        n = max(1, self.max_buckets // 10)
        ordenados = sorted(self._buckets.items(), key=lambda kv: kv[1].last_refill)
        for key, _ in ordenados[:n]:
            self._buckets.pop(key, None)

    def try_consume(self, key: str, amount: float = 1.0) -> bool:
        if amount <= 0:
            raise ValueError("amount debe ser > 0")
        if amount > self.capacity:
            return False

        now = time.monotonic()
        with self._lock:
            bucket = self._buckets.get(key)
            if bucket is None:
                self._evict_oldest_if_needed()
                bucket = _Bucket(tokens=float(self.capacity), last_refill=now)
                self._buckets[key] = bucket
            self._refill(bucket, now)
            if bucket.tokens >= amount:
                bucket.tokens -= amount
                return True
            return False

    def remaining(self, key: str) -> float:
        now = time.monotonic()
        with self._lock:
            bucket = self._buckets.get(key)
            if bucket is None:
                return float(self.capacity)
            self._refill(bucket, now)
            return bucket.tokens

    def reset(self, key: str) -> None:
        with self._lock:
            self._buckets.pop(key, None)

    def clear(self) -> None:
        with self._lock:
            self._buckets.clear()

    @property
    def bucket_count(self) -> int:
        with self._lock:
            return len(self._buckets)


class TimeoutError_(Exception):
    """Timeout de operación."""


@contextmanager
def timeout(seconds: float) -> Iterator[None]:
    if seconds <= 0:
        raise ValueError("seconds debe ser > 0")

    if not hasattr(signal, "SIGALRM") or threading.current_thread() is not threading.main_thread():
        yield
        return

    def _handler(signum, frame):
        raise TimeoutError_(f"operación excedió {seconds}s")

    viejo = signal.signal(signal.SIGALRM, _handler)
    signal.setitimer(signal.ITIMER_REAL, seconds)
    try:
        yield
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        signal.signal(signal.SIGALRM, viejo)
