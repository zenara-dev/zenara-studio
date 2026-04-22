from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Resend config
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev").strip()
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "").strip()

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Z-Digital Solutions API")
api_router = APIRouter(prefix="/api")

# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class InquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    budget: Optional[str] = Field(default=None, max_length=60)
    tier: Optional[str] = Field(default=None, max_length=60)
    message: str = Field(min_length=1, max_length=4000)


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    budget: Optional[str] = None
    tier: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False


# ---------- Helpers ----------
def _inquiry_email_html(inq: Inquiry) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Helvetica, Arial, sans-serif; color: #050505;">
      <tr><td style="padding:24px; border-bottom:1px solid #E5E5E5;">
        <div style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#737373;">Z-Digital Solutions</div>
        <h1 style="margin:8px 0 0 0; font-size:24px;">New Project Inquiry</h1>
      </td></tr>
      <tr><td style="padding:24px;">
        <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
          <tr><td style="width:140px; color:#737373;">Name</td><td><strong>{inq.name}</strong></td></tr>
          <tr><td style="color:#737373;">Email</td><td>{inq.email}</td></tr>
          <tr><td style="color:#737373;">Company</td><td>{inq.company or '—'}</td></tr>
          <tr><td style="color:#737373;">Tier</td><td>{inq.tier or '—'}</td></tr>
          <tr><td style="color:#737373;">Budget</td><td>{inq.budget or '—'}</td></tr>
        </table>
        <div style="margin-top:24px; padding:16px; border:1px solid #E5E5E5; background:#F9F9F9; white-space:pre-wrap;">{inq.message}</div>
      </td></tr>
    </table>
    """


async def _send_inquiry_email(inq: Inquiry) -> bool:
    if not RESEND_API_KEY or not NOTIFY_EMAIL:
        return False
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFY_EMAIL],
        "reply_to": [str(inq.email)],
        "subject": f"New inquiry — {inq.name}" + (f" ({inq.tier})" if inq.tier else ""),
        "html": _inquiry_email_html(inq),
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception as e:
        logger.error(f"Resend send failed: {e}")
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Z-Digital Solutions API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "email_configured": bool(RESEND_API_KEY and NOTIFY_EMAIL),
    }


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get("timestamp"), str):
            check["timestamp"] = datetime.fromisoformat(check["timestamp"])
    return status_checks


@api_router.post("/contact", response_model=Inquiry, status_code=201)
async def create_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    # Persist first
    doc = inquiry.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.inquiries.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to save inquiry")
        raise HTTPException(status_code=500, detail="Could not save inquiry")

    # Best-effort email
    sent = await _send_inquiry_email(inquiry)
    if sent:
        await db.inquiries.update_one({"id": inquiry.id}, {"$set": {"email_sent": True}})
        inquiry.email_sent = True

    return inquiry


@api_router.get("/contact", response_model=List[Inquiry])
async def list_inquiries():
    items = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get("created_at"), str):
            it["created_at"] = datetime.fromisoformat(it["created_at"])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
