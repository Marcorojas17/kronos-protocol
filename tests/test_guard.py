"""Tests del rate limiter y del timeout."""
import sys
import threading
import time
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from kronos360.crypto.guard import RateLimiter, TimeoutError_, timeout


def test_allows_up_to_capacity():
    limiter = RateLimiter(capacity=5, refill_per_second=0.0001)
    for i in range(5):
        assert limiter.try_consume("k") is True, f"falló en {i}"
    assert limiter.try_consume("k") is False


def test_refills_over_time():
    limiter = RateLimiter(capacity=2, refill_per_second=100.0)
    assert limiter.try_consume("k") is True
    assert limiter.try_consume("k") is True
    assert limiter.try_consume("k") is False
    time.sleep(0.05)
    assert limiter.try_consume("k") is True


def test_keys_independent():
    limiter = RateLimiter(capacity=1, refill_per_second=0.0001)
    assert limiter.try_consume("a") is True
    assert limiter.try_consume("b") is True
    assert limiter.try_consume("a") is False
    assert limiter.try_consume("b") is False


def test_remaining_reflects_consumption():
    limiter = RateLimiter(capacity=3, refill_per_second=0.0001)
    assert limiter.remaining("k") == 3.0
    limiter.try_consume("k")
    assert limiter.remaining("k") == pytest.approx(2.0, abs=0.01)
    limiter.try_consume("k", amount=2.0)
    assert limiter.remaining("k") == pytest.approx(0.0, abs=0.01)


def test_amount_greater_than_capacity_denied():
    limiter = RateLimiter(capacity=3, refill_per_second=1.0)
    assert limiter.try_consume("k", amount=10.0) is False
    assert limiter.remaining("k") == 3.0


def test_reset_clears_bucket():
    limiter = RateLimiter(capacity=1, refill_per_second=0.0001)
    assert limiter.try_consume("k") is True
    assert limiter.try_consume("k") is False
    limiter.reset("k")
    assert limiter.try_consume("k") is True


def test_clear_removes_all():
    limiter = RateLimiter(capacity=10, refill_per_second=1.0)
    for i in range(50):
        limiter.try_consume(f"k{i}")
    assert limiter.bucket_count == 50
    limiter.clear()
    assert limiter.bucket_count == 0


def test_max_buckets_eviction():
    limiter = RateLimiter(capacity=1, refill_per_second=1.0, max_buckets=100)
    for i in range(200):
        limiter.try_consume(f"k{i}")
    assert limiter.bucket_count <= 100


def test_invalid_parameters():
    with pytest.raises(ValueError):
        RateLimiter(capacity=0)
    with pytest.raises(ValueError):
        RateLimiter(refill_per_second=0)
    with pytest.raises(ValueError):
        RateLimiter(max_buckets=0)


def test_amount_must_be_positive():
    limiter = RateLimiter(capacity=5, refill_per_second=1.0)
    with pytest.raises(ValueError):
        limiter.try_consume("k", amount=0)
    with pytest.raises(ValueError):
        limiter.try_consume("k", amount=-1)


def test_thread_safety():
    limiter = RateLimiter(capacity=50, refill_per_second=0.0001)
    exitos = []

    def worker():
        if limiter.try_consume("shared"):
            exitos.append(1)

    hilos = [threading.Thread(target=worker) for _ in range(100)]
    for h in hilos:
        h.start()
    for h in hilos:
        h.join()

    assert len(exitos) == 50


def test_timeout_passes_fast_block():
    with timeout(seconds=1.0):
        x = 1 + 1
    assert x == 2


def test_timeout_raises_on_slow_block():
    with pytest.raises(TimeoutError_):
        with timeout(seconds=0.1):
            time.sleep(1.0)


def test_timeout_invalid_seconds():
    with pytest.raises(ValueError):
        with timeout(seconds=0):
            pass
    with pytest.raises(ValueError):
        with timeout(seconds=-1):
            pass
