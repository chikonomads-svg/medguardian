"""
MedGuardian - Community Routes
GET  /community/posts          - Get community posts
POST /community/posts/create   - Create a new post
PUT  /community/posts/{id}/upvote - Upvote a post
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.data.dummy_data import DUMMY_COMMUNITY_POSTS
import uuid

router = APIRouter(prefix="/community", tags=["Community"])

_posts = list(DUMMY_COMMUNITY_POSTS)


class CreatePostRequest(BaseModel):
    author: str = "Dr. Anonymous"
    specialty: str = "General Medicine"
    content: str
    post_type: str = "support"
    is_anonymous: bool = False


@router.get("/posts")
async def get_posts(post_type: Optional[str] = None):
    """Returns community posts, optionally filtered by type."""
    posts = _posts
    if post_type:
        posts = [p for p in _posts if p.get("post_type") == post_type]
    return {
        "success": True,
        "posts": sorted(posts, key=lambda x: x.get("upvotes", 0), reverse=True),
        "total": len(posts),
    }


@router.post("/posts/create")
async def create_post(payload: CreatePostRequest):
    """Creates a new community post."""
    post = {
        "id": f"post-{str(uuid.uuid4())[:8]}",
        "author": "Anonymous Doctor" if payload.is_anonymous else payload.author,
        "specialty": payload.specialty,
        "is_anonymous": payload.is_anonymous,
        "post_type": payload.post_type,
        "content": payload.content,
        "upvotes": 0,
        "comments_count": 0,
        "created_at": datetime.now().isoformat(),
    }
    _posts.insert(0, post)
    return {"success": True, "message": "Post created.", "post": post}


@router.put("/posts/{post_id}/upvote")
async def upvote_post(post_id: str):
    """Increments the upvote count for a post."""
    post = next((p for p in _posts if p["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post["upvotes"] = post.get("upvotes", 0) + 1
    return {"success": True, "post_id": post_id, "upvotes": post["upvotes"]}
