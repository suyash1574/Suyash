# Quickstart Validation Guide: Personal Portfolio Website (FastAPI)

**Feature**: [plan.md](file:///d:/Projects/Personal%20website/specs/001-personal-website/plan.md)

---

This guide outlines how to launch the application locally and run verification steps to confirm that both the React frontend SPA (Vite) and backend SMTP email mailer (FastAPI) are working correctly.

## 1. Prerequisites
- Node.js (v18 or higher) and npm installed.
- Python 3.10 or higher installed.
- A modern web browser (e.g., Chrome, Safari, Firefox, Edge).
- A valid SMTP email account (e.g., Gmail with an "App Password" generated) to test email delivery.

## 2. Setup Configuration

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file based on `.env.example` and edit with your SMTP mail server settings:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   RECEIVER_EMAIL=zinjurke77h@gmail.com
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install node dependencies:
   ```bash
   npm install
   ```

---

## 3. Running the Application

### Start Backend Service
Run the FastAPI web runner:
```bash
cd backend
python app.py
```
*Expected Output:* Uvicorn starts serving at `http://127.0.0.1:5000` with hot-reloading active.

### Start Frontend Client
Run the Vite development server:
```bash
cd frontend
npm run dev
```
*Expected Output:* The dev server boots and the website is available at `http://localhost:5173`.

---

## 4. Verification Scenarios

### Scenario 1: Interactive Elements & Animations
1. Open the portfolio website in your browser (`http://localhost:5173`).
2. Move your cursor around the background.
   - *Pass Criteria:* Visual canvas particle nodes follow or react to mouse movement, creating connection lines.
3. Scroll down the page.
   - *Pass Criteria:* Section headers and project cards transition smoothly into view via choreographed slide/fade animations.
4. Toggle "Reduce Motion" system preferences.
   - *Pass Criteria:* Scroll entrance animations and background particle effects stop instantly.

### Scenario 2: Project Detail Modals
1. Scroll to the **Projects** section.
2. Click on the card for **AI Interview System** (featured B-Tech project).
   - *Pass Criteria:* A modal overlay appears containing detailed text, tech stack tags, and links, locking keyboard focus.
3. Click the close button or press the `Escape` key.
   - *Pass Criteria:* The modal closes immediately and focus is returned to the card.

### Scenario 3: Contact Form SMTP Submission
1. Scroll to the **Contact** section.
2. Fill in form values:
   - Name: `Recruiter Test`
   - Email: `test@company.com`
   - Message: `Hello, we would like to interview you for the AI Intern position.`
3. Click **Submit**.
   - *Pass Criteria:* A loader spinner appears, and after a moment a success banner is displayed. Check your configured inbox (`RECEIVER_EMAIL`) to verify the message was received.
