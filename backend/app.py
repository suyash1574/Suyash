"""Render-compatible portfolio assistant and health service."""

from datetime import datetime, timezone
import json
import os
import time
import urllib.error
import urllib.request
from typing import Literal

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field


app = FastAPI(title="Suyash Portfolio Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://suyash-qgpq-seven.vercel.app",
        "https://suyashai-d3r2yxvb.manus.space",
        "http://localhost:3000",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

SYSTEM_PROMPT = """You are Suyash Zinjurke's portfolio assistant. Speak as Suyash's assistant, not as Suyash himself. Help visitors understand Suyash's AI engineering background, experience, projects, skills, internship and collaboration availability, and how to contact him.

Use only these facts: Suyash is an AI Engineer and final-year B.Tech student in Artificial Intelligence & Data Science at AISSMS IOIT, Pune. His focus includes practical AI systems, RAG, LLM applications, automation, diagnostics, Python, SQL, LangChain, Azure AI Services, ETL workflows, Power BI, and Tableau. He has worked as an AI Automation Intern at Knorr-Bremse Technology Centre India and as a Data Analytics Intern at NexGen Analytix. His portfolio includes an AI Interview System, CodeFlow AI, and the planned TracePilot diagnostics workbench.

For serious opportunities, recommend zinjurke77h@gmail.com or https://www.linkedin.com/in/suyash-zinjurke-9045832a5/. Do not claim to schedule meetings, send emails, submit applications, access private systems, negotiate terms, or make commitments on Suyash's behalf. Do not invent facts. Keep answers concise, warm, technically grounded, and actionable."""

MAX_REQUESTS_PER_MINUTE = 8
RATE_LIMITS: dict[str, tuple[int, float]] = {}


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=1400)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=8)


def health_payload() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "suyash-portfolio-render-api",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


def enforce_rate_limit(client_id: str) -> None:
    now = time.monotonic()
    count, reset_at = RATE_LIMITS.get(client_id, (0, now + 60))
    if now >= reset_at:
        count, reset_at = 0, now + 60
    if count >= MAX_REQUESTS_PER_MINUTE:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Please wait a minute before sending another message.",
        )
    RATE_LIMITS[client_id] = (count + 1, reset_at)


def stream_completion(endpoint: str, api_key: str, model: str, messages: list[dict[str, str]]):
    payload_data: dict[str, object] = {
        "model": model,
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}, *messages],
        "temperature": 0.35,
        "max_tokens": 700,
        "stream": True,
    }
    if "integrate.api.nvidia.com" in endpoint:
        payload_data["chat_template_kwargs"] = {"enable_thinking": False}

    payload = json.dumps(payload_data).encode("utf-8")
    request = urllib.request.Request(
        endpoint,
        data=payload,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        emitted = False
        for raw_line in response:
            line = raw_line.decode("utf-8").strip()
            if not line.startswith("data:"):
                continue

            event_data = line.removeprefix("data:").strip()
            if event_data == "[DONE]":
                break

            try:
                data = json.loads(event_data)
            except json.JSONDecodeError:
                continue

            delta = data.get("choices", [{}])[0].get("delta", {})
            content = delta.get("content")
            if content:
                emitted = True
                yield content

        if not emitted:
            raise ValueError("Provider returned an empty streamed response")


def stream_assistant_response(messages: list[dict[str, str]]):
    providers = [
        (
            os.getenv("NVIDIA_NIM_API_KEY") or os.getenv("NVIDIA_API_KEY", ""),
            "https://integrate.api.nvidia.com/v1/chat/completions",
            "nvidia/nemotron-3.5-lightning-30b-a3b",
            "NVIDIA NIM",
        ),
        (
            os.getenv("GROQ_API_KEY", ""),
            "https://api.groq.com/openai/v1/chat/completions",
            "llama-3.3-70b-versatile",
            "Groq",
        ),
    ]
    configured = [provider for provider in providers if provider[0]]

    failures: list[str] = []
    for api_key, endpoint, model, provider_name in configured:
        emitted = False
        try:
            for token in stream_completion(endpoint, api_key, model, messages):
                emitted = True
                yield f"data: {json.dumps({'token': token})}\n\n"
            if emitted:
                yield "data: [DONE]\n\n"
                return
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, ValueError) as exc:
            failures.append(f"{provider_name}: {exc}")
            if emitted:
                yield f"data: {json.dumps({'token': '  I’m sorry, that response was interrupted. Please try again.'})}\n\n"
                yield "data: [DONE]\n\n"
                return

    yield f"data: {json.dumps({'token': 'I’m temporarily unavailable. For opportunities or project conversations, please email Suyash at zinjurke77h@gmail.com.'})}\n\n"
    yield "data: [DONE]\n\n"


@app.get("/", tags=["health"])
@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    """Return a small, unauthenticated liveness response for Render."""
    return health_payload()


@app.post("/api/assistant/chat", tags=["assistant"])
def assistant_chat(payload: ChatRequest, request: Request) -> StreamingResponse:
    client_id = request.client.host if request.client else "unknown"
    enforce_rate_limit(client_id)
    messages = [{"role": message.role, "content": message.content.strip()} for message in payload.messages]

    if not (os.getenv("NVIDIA_NIM_API_KEY") or os.getenv("NVIDIA_API_KEY") or os.getenv("GROQ_API_KEY")):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The portfolio assistant is not configured yet. Please email Suyash at zinjurke77h@gmail.com.",
        )

    return StreamingResponse(
        stream_assistant_response(messages),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache, no-transform", "Connection": "keep-alive", "X-Accel-Buffering": "no"},
    )
