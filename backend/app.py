import re
import smtplib
import logging
import urllib.request
import json
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import FastAPI, HTTPException, BackgroundTasks, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from config import Config

# Configure logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("backend-api")
logger.info(f"Loaded SMTP_USER: {Config.SMTP_USER}")
logger.info(f"Loaded SMTP_PASSWORD: {'[SET]' if Config.SMTP_PASSWORD else '[NOT SET]'}")
logger.info(f"Loaded RECEIVER_EMAIL: {Config.RECEIVER_EMAIL}")

app = FastAPI(
    title="Suyash Zinjurke's Portfolio API",
    description="FastAPI email transmission backend service.",
    version="1.0.0"
)

# Configure CORS Middleware (allowing React client dev servers on any local port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EMAIL_REGEX = re.compile(
    r'^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
)

# Pydantic validation request body schema
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Sender name")
    email: str = Field(..., min_length=3, max_length=100, description="Sender email address")
    message: str = Field(..., min_length=10, max_length=2000, description="Inquiry message")

    @field_validator('email')
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        clean_email = v.strip()
        if not EMAIL_REGEX.match(clean_email):
            raise ValueError('Email address format is invalid')
        return clean_email

    @field_validator('name', 'message')
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        return v.strip()


def send_smtp_email_task(sender_name: str, sender_email: str, message_body: str):
    """
    Background worker task to dispatch SMTP emails out-of-band.
    """
    smtp_host = Config.SMTP_HOST
    smtp_port = Config.SMTP_PORT
    smtp_user = Config.SMTP_USER
    smtp_password = Config.SMTP_PASSWORD
    receiver_email = Config.RECEIVER_EMAIL

    if not smtp_user or not smtp_password or not receiver_email:
        logger.error("SMTP configuration parameters are missing. Cannot dispatch mail.")
        return

    try:
        # Create MIME structure
        msg = MIMEMultipart()
        msg['From'] = f"{sender_name} <{smtp_user}>"
        msg['To'] = receiver_email
        msg['Reply-To'] = sender_email
        msg['Subject'] = f"Portfolio Contact Form: {sender_name}"

        body_text = f"You have received a new message from your portfolio contact form:\n\n" \
                    f"Name: {sender_name}\n" \
                    f"Email: {sender_email}\n\n" \
                    f"Message:\n{message_body}\n"
                    
        msg.attach(MIMEText(body_text, 'plain', 'utf-8'))

        logger.info(f"Connecting to SMTP host {smtp_host}:{smtp_port}...")
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
        server.ehlo()

        if smtp_port == 587:
            server.starttls()
            server.ehlo()

        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, receiver_email, msg.as_string())
        server.quit()
        logger.info("Email dispatched successfully via background worker task.")
    except Exception as exc:
        logger.error(f"Failed to dispatch SMTP email: {exc}")


FALLBACK_PROJECTS = [
    {
        "id": "ai-interview",
        "title": "AI Interview System",
        "desc": "An AI-powered mock interview simulator with multi-agent evaluation scorecards and dynamic question compilers.",
        "url": "https://github.com/Final-Year-B-Tech-Project/main-copy",
        "language": "Python",
        "stars": 0,
        "forks": 0,
        "issues": 0,
        "pushedAt": "2026-07-13T00:00:00Z",
        "topics": ["Flask", "Gemini AI", "LangChain"]
    },
    {
        "id": "BigQuery-ETL-Pipeline",
        "title": "BigQuery-ETL-Pipeline",
        "desc": "An automated ETL pipeline loading, converting, and schema-validating large transactional sales logs into Google BigQuery.",
        "url": "https://github.com/Suyash-Projects/BigQuery-ETL-Pipeline",
        "language": "Python",
        "stars": 1,
        "forks": 0,
        "issues": 0,
        "pushedAt": "2026-07-10T00:00:00Z",
        "topics": ["Python", "SQL", "BigQuery", "ETL"]
    },
    {
        "id": "Agriculture-Prediction-Plant-Analysis",
        "title": "Agriculture-Prediction-Plant-Analysis",
        "desc": "Computer vision and deep learning models detecting crop anomalies, leaf classifications, and yield parameters.",
        "url": "https://github.com/Suyash-Projects/Agriculture-Prediction-Plant-Analysis",
        "language": "Python",
        "stars": 0,
        "forks": 0,
        "issues": 0,
        "pushedAt": "2026-07-08T00:00:00Z",
        "topics": ["Deep Learning", "PyTorch", "Computer Vision"]
    },
    {
        "id": "Blog-Generation-System",
        "title": "Blog-Generation-System",
        "desc": "A text-generation backend engine compiling rich blog templates from user bullet points using Llama-3 NLP APIs.",
        "url": "https://github.com/Suyash-Projects/Blog-Generation-System",
        "language": "Python",
        "stars": 0,
        "forks": 0,
        "issues": 0,
        "pushedAt": "2026-07-05T00:00:00Z",
        "topics": ["NLP", "Llama-3", "Flask", "Prompt Engineering"]
    },
    {
        "id": "Credit-Card-Dashboard",
        "title": "Credit-Card-Dashboard",
        "desc": "Interactive visual reporting dashboard analyzing transaction trends, customer retention rates, and risk profiles.",
        "url": "https://github.com/Suyash-Projects/Credit-Card-Dashboard",
        "language": "Power BI",
        "stars": 0,
        "forks": 0,
        "issues": 0,
        "pushedAt": "2026-07-01T00:00:00Z",
        "topics": ["Power BI", "Data Analysis", "DAX"]
    }
]

PROJECTS_CACHE = {
    "data": None,
    "timestamp": 0
}

@app.get("/api/projects", status_code=status.HTTP_200_OK)
def get_ai_sorted_projects():
    global PROJECTS_CACHE
    
    current_time = time.time()
    # Cache duration: 24 hours (86400 seconds)
    if PROJECTS_CACHE["data"] and (current_time - PROJECTS_CACHE["timestamp"] < 86400):
        logger.info("Returning AI-sorted projects list from memory cache.")
        return PROJECTS_CACHE["data"]

    # If no API key is provided, fallback immediately
    if not Config.NVIDIA_API_KEY:
        logger.warning("NVIDIA_API_KEY is not set. Falling back to local projects list.")
        return FALLBACK_PROJECTS

    try:
        # Fetch GitHub Repos
        def fetch_github_repos(url):
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=8) as response:
                return json.loads(response.read().decode('utf-8'))
        
        logger.info("Fetching fresh repositories from GitHub API...")
        user_repos = fetch_github_repos("https://api.github.com/users/suyash1574/repos")
        org_repos = fetch_github_repos("https://api.github.com/orgs/Suyash-Projects/repos")
        all_repos = user_repos + org_repos
        
        repo_list = []
        for r in all_repos:
            if r.get("fork") and r.get("stargazers_count", 0) == 0:
                continue
            repo_list.append({
                "name": r.get("name"),
                "description": r.get("description"),
                "language": r.get("language"),
                "stars": r.get("stargazers_count", 0),
                "topics": r.get("topics", []),
                "url": r.get("html_url"),
                "pushed_at": r.get("pushed_at")
            })

        # Dedup by name
        seen = set()
        unique_repos = []
        for r in repo_list:
            name_lower = r["name"].lower()
            if name_lower not in seen:
                seen.add(name_lower)
                unique_repos.append(r)

        # Call NVIDIA NIM Llama-3.1 API to filter top project names
        logger.info("Calling NVIDIA NIM API to filter flagship project names...")
        payload = {
            "model": "meta/llama-3.1-70b-instruct",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a senior AI engineer. Analyze the candidate's GitHub repositories and select the top 5-6 best project names for their portfolio. Filter out basic, homework, or fork repositories. Return a JSON list of strings containing only the selected repository names."
                },
                {
                    "role": "user",
                    "content": (
                        "Select the names of the top 5-6 repositories to keep in the portfolio. "
                        "Return ONLY a raw JSON list of strings (repository names).\n\n"
                        f"Repositories:\n{json.dumps(unique_repos, indent=2)}"
                    )
                }
            ],
            "temperature": 0.1,
            "max_tokens": 128
        }
        
        req_data = json.dumps(payload).encode('utf-8')
        headers = {
            "Authorization": f"Bearer {Config.NVIDIA_API_KEY}",
            "Content-Type": "application/json"
        }
        
        req = urllib.request.Request(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            data=req_data,
            headers=headers,
            method="POST"
        )
        
        start_time = time.time()
        with urllib.request.urlopen(req, timeout=30) as response:
            logger.info(f"NVIDIA NIM API responded in {time.time() - start_time:.2f} seconds.")
            res_data = json.loads(response.read().decode('utf-8'))
            raw_content = res_data["choices"][0]["message"]["content"].strip()
            
            # Clean up potential markdown formatting block wrapper (e.g. ```json ... ```)
            if raw_content.startswith("```"):
                lines = raw_content.splitlines()
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines[-1].startswith("```"):
                    lines = lines[:-1]
                raw_content = "\n".join(lines).strip()
            
            selected_names = json.loads(raw_content)
            selected_names = [name.lower() for name in selected_names]
            
            # Filter unique_repos to keep only those selected by the AI
            filtered_projects = []
            for r in unique_repos:
                if r["name"].lower() in selected_names:
                    repo_id = "ai-interview" if r["name"] == "main-copy" else r["name"]
                    repo_title = "AI Interview System" if r["name"] == "main-copy" else r["name"]
                    
                    filtered_projects.append({
                        "id": repo_id,
                        "title": repo_title,
                        "desc": r["description"] or "No description provided.",
                        "url": r["url"],
                        "language": r["language"],
                        "stars": r["stars"],
                        "topics": r["topics"],
                        "pushedAt": r["pushed_at"]
                    })
            
            if len(filtered_projects) > 0:
                PROJECTS_CACHE["data"] = filtered_projects
                PROJECTS_CACHE["timestamp"] = current_time
                logger.info(f"Successfully cached {len(filtered_projects)} AI-filtered projects.")
                return filtered_projects
            else:
                raise ValueError("No matching repositories found in selection.")

    except Exception as exc:
        logger.error(f"Error fetching or sorting projects dynamically: {exc}")
        # Fallback to local hardcoded list
        return FALLBACK_PROJECTS

@app.get("/", status_code=status.HTTP_200_OK)
def health_check():
    return {
        "status": "healthy",
        "message": "Suyash Zinjurke's Personal Website FastAPI is running."
    }


@app.post("/api/contact", status_code=status.HTTP_200_OK)
def contact_submit(payload: ContactRequest, background_tasks: BackgroundTasks):
    # Debug: log what Config sees at request time
    logger.info(f"[ENDPOINT] SMTP_USER='{Config.SMTP_USER}' PASSWORD_SET={bool(Config.SMTP_PASSWORD)} RECEIVER='{Config.RECEIVER_EMAIL}'")
    # Verify SMTP credentials availability
    if not Config.SMTP_USER or not Config.SMTP_PASSWORD or not Config.RECEIVER_EMAIL:
        logger.error(f"SMTP environment variables are incomplete. USER='{Config.SMTP_USER}' PASS_LEN={len(Config.SMTP_PASSWORD) if Config.SMTP_PASSWORD else 0} RECV='{Config.RECEIVER_EMAIL}'")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Mail server configuration error on host."
        )
        
    # Delegate SMTP network operations to background task runner
    background_tasks.add_task(
        send_smtp_email_task,
        payload.name,
        payload.email,
        payload.message
    )
    
    return {
        "status": "success",
        "message": "Message received. Sending email in the background."
    }


if __name__ == "__main__":
    import uvicorn
    # Read debug parameter
    debug_mode = Config.DEBUG
    # Run uvicorn programmatic loop matching python app.py calls
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=debug_mode)
