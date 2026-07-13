# Implementation Plan: Personal Portfolio Website (FastAPI Backend)

**Branch**: `001-personal-website` | **Date**: 2026-07-13 | **Spec**: [spec.md](file:///d:/Projects/Personal%20website/specs/001-personal-website/spec.md)

**Input**: Feature specification update: "convert backend in to the fastapi"

## Summary
The goal is to transition the backend service from **Python Flask** to **FastAPI**, served by **Uvicorn**. We will replace Flask routes with FastAPI decorators, utilize **Pydantic** schema models for request payload validations, configure ASGI CORS middlewares, and leverage FastAPI's native **BackgroundTasks** to dispatch SMTP emails asynchronously (allowing the API call to return instantly without waiting for smtplib network handshakes).

## Proposed Changes

### Backend Component

#### [MODIFY] [requirements.txt](file:///d:/Projects/Personal%20website/backend/requirements.txt)
- Replace Flask and Flask-CORS with:
  - `fastapi==0.103.1`
  - `uvicorn==0.23.2`
  - `pydantic==2.3.0`
  - `python-dotenv==1.0.0`

#### [MODIFY] [app.py](file:///d:/Projects/Personal%20website/backend/app.py)
- Refactor the server framework:
  - Initialize `app = FastAPI()`.
  - Configure `CORSMiddleware` to allow requests from the React dev server (port 5173).
  - Define a Pydantic schema model `ContactRequest` validating:
    - `name` (1–100 characters).
    - `email` (matching standard email regex).
    - `message` (10–2000 characters).
  - Create route handlers:
    - `GET /`: returns health check JSON.
    - `POST /api/contact`: receives validated `ContactRequest` body, queues email transmission in `BackgroundTasks`, and returns a `200 OK` success response instantly.
  - Implement async loggers and smtplib error handling inside SMTP methods.

## Verification Plan

### Automated Tests
- Run python compilation syntax checks on backend app scripts.
- Launch the Uvicorn server and verify that endpoints respond.

### Manual Verification
- Deploy backend locally, submit contact form from React frontend, verify Uvicorn server logs show receipt of payload, and confirm target email inbox receives the message.
