import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file (anchored to this file's directory
# so uvicorn's reloader subprocess always finds it regardless of CWD)
_env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=_env_path)

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "default-dev-secret-key-123")
    
    # SMTP Email Configuration
    SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
    SMTP_USER = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
    RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL", "")
    
    # Debug/Environment mode
    DEBUG = os.getenv("FLASK_DEBUG", "1") == "1"
