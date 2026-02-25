"""
MedGuardian — Community (simplified: post concerns)
"""
import uuid
from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel
from app.data.dummy_data import DUMMY_COMMUNITY_POSTS

router = APIRouter(prefix="/community", tags=["Community"])

# In-memory store
_posts = list(DUMMY_COMMUNITY_POSTS)


class ConcernCreate(BaseModel):
    author: str = "Anonymous Doctor"
    content: str


@router.get("/posts")
async def get_posts():
    """Get all community posts/concerns."""
    return {"posts": _posts}


@router.post("/posts/create")
async def create_post(concern: ConcernCreate):
    """Post a new concern to the community."""
    new_post = {
        "id": f"p-{uuid.uuid4().hex[:6]}",
        "author": concern.author,
        "specialty": "General",
        "type": "concern",
        "content": concern.content,
        "upvotes": 0,
        "comments": 0,
        "anonymous": concern.author == "Anonymous Doctor",
        "time": "Just now",
        "created_at": datetime.utcnow().isoformat(),
    }
    _posts.insert(0, new_post)
    return {"status": "created", "post": new_post}
