# Research & Decisions: Personal Portfolio Website (FastAPI Backend)

**Feature**: [plan.md](file:///d:/Projects/Personal%20website/specs/001-personal-website/plan.md)

---

## 1. Backend Service Framework (FastAPI)

### Decision
Transition the backend API service from Python Flask to FastAPI, using Uvicorn as the ASGI web server.

### Rationale
- **Performance**: FastAPI is built on Starlette and Pydantic, making it one of the fastest Python frameworks available.
- **Automatic Validation**: Integrates Pydantic out of the box, allowing us to enforce request body schemas with standard Python type hints and raise automatic `422 Unprocessable Entity` validations for client errors.
- **Background Tasks**: Includes built-in support for asynchronous background processes. We can dispatch smtplib transactions out-of-band, returning an instant response to the client and meeting success criteria response times.

### Alternatives Considered
- **Flask**: Rejected. While simple, it runs synchronously by default, meaning SMTP connections block the main web worker, slowing down user form submissions.
- **Node.js (Express)**: Rejected. We prefer to maintain Python for the email parser backend, aligning with the user's requirements.

---

## 2. Pydantic Email Validation Schema

### Decision
Define email checks inside a Pydantic model (`ContactRequest`) using a custom regex validator.

### Rationale
- Leveraging Pydantic's `@field_validator` decorator gives us absolute control over the validation rules without requiring external packages like `email-validator` (which is needed for Pydantic's built-in `EmailStr`). This simplifies the backend's dependency matrix.

---

## 3. Asynchronous SMTP Dispatch

### Decision
Offload the smtplib connection, TLS handshakes, logins, and email transmissions into FastAPI's `BackgroundTasks`.

### Rationale
- Prevents SMTP network latency (which can take 1–3 seconds depending on host routing and mail relays) from delaying the client's HTTP response. The user sees a "sent" success banner in under 150ms.
