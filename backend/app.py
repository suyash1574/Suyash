"""Minimal Render-compatible health service for the portfolio backend."""

from datetime import datetime, timezone

from fastapi import FastAPI


app = FastAPI(title="Suyash Portfolio Backend", version="1.0.0")


def health_payload() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "suyash-portfolio-render-api",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/", tags=["health"])
@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    """Return a small, unauthenticated liveness response for Render."""
    return health_payload()
