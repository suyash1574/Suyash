# Data Model: Personal Portfolio Website

**Feature**: [plan.md](file:///d:/Projects/Personal%20website/specs/001-personal-website/plan.md)

---

Since this application is a static frontend with a serverless/stateless contact handler backend, there is no persistent database storage required. However, the data payloads passing through the system are structured as follows:

## 1. ContactMessage

Represents the data submitted via the website's contact form and received by the Flask email handler.

### Attributes
- `name` (String): The sender's name.
  - Validation: Required, non-empty, max 100 characters.
- `email` (String): The sender's email address.
  - Validation: Required, must match standard RFC 5322 email regex pattern.
- `message` (String): The message content.
  - Validation: Required, minimum 10 characters, maximum 2000 characters.

### Data Flow
```text
[Frontend Form] 
       │ (JSON POST Payload)
       ▼
[Flask Backend Validation] 
       │ (SMTP Client)
       ▼
[Target Inbox (zinjurke77h@gmail.com)]
```

---

## 2. Project

Represents a project entry displayed on the portfolio page and rendered inside the interactive detail modal.

### Attributes
- `title` (String): The name of the project.
- `description` (String): A short 1-2 sentence preview.
- `details` (String/HTML): Detailed paragraphs of features, architecture, and learnings.
- `techStack` (Array of Strings): Key libraries or languages used (e.g., `["Flask", "Gemini AI", "Pandas"]`).
- `githubUrl` (String): URL to the open-source repository.
- `demoUrl` (String, Optional): URL to the live deployment.
- `isFeatured` (Boolean): Flag to highlight the B-Tech project at the top of the grid.

---

## 3. Experience

Represents a milestone in the resume timeline.

### Attributes
- `organization` (String): Company or institution name (e.g., `Knorr-Bremse`, `AISSMS IOIT`).
- `role` (String): Position title or degree name.
- `duration` (String): Date range (e.g., `Mar 2026 – Present`).
- `bullets` (Array of Strings): Key achievements or study courses.
- `type` (Enum): Either `"education"` or `"internship"`.
