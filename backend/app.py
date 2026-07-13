import re
import smtplib
import logging
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
