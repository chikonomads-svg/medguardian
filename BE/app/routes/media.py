"""
MedGuardian - Media Support Routes
GET  /media/statements        - Get media statements
POST /media/statements/draft  - Create a new draft statement
GET  /media/monitoring        - Simulated social media sentiment feed
"""
from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.data.dummy_data import DUMMY_MEDIA_STATEMENTS

router = APIRouter(prefix="/media", tags=["Media"])

_statements = list(DUMMY_MEDIA_STATEMENTS)


class StatementDraftRequest(BaseModel):
    doctor_id: str = "doc-001"
    title: str
    content: str


@router.get("/statements")
async def get_statements(doctor_id: str = "doc-001"):
    """Returns media statements for a doctor."""
    return {"success": True, "statements": _statements, "total": len(_statements)}


@router.post("/statements/draft")
async def draft_statement(payload: StatementDraftRequest):
    """Creates a new draft press statement."""
    new_stmt = {
        "id": f"stmt-{len(_statements)+1:03d}",
        "doctor_id": payload.doctor_id,
        "title": payload.title,
        "content": payload.content,
        "status": "draft",
        "published_at": None,
        "created_at": datetime.now().isoformat(),
    }
    _statements.append(new_stmt)
    return {"success": True, "message": "Draft statement created.", "statement": new_stmt}


@router.get("/monitoring")
async def get_sentiment_feed():
    """Returns a simulated social media monitoring feed."""
    feed = [
        {"platform": "Twitter/X", "sentiment": "neutral", "mentions": 24, "summary": "Mentions of doctor safety in Mumbai trending mildly."},
        {"platform": "Facebook", "sentiment": "positive", "mentions": 67, "summary": "Support posts for healthcare workers gaining traction."},
        {"platform": "News", "sentiment": "negative", "mentions": 3, "summary": "3 news articles about hospital violence published today."},
    ]
    return {"success": True, "feed": feed, "last_updated": datetime.now().isoformat()}
