"""
MedGuardian — News Feed (Tavily Search API)
Fetches latest medical/healthcare news from Bihar & Muzaffarpur
"""
import os
import time
import httpx
from fastapi import APIRouter

router = APIRouter(prefix="/news", tags=["News"])

# ── In-memory cache (15 min TTL) ──
_cache = {"data": None, "ts": 0}
CACHE_TTL = 900  # 15 minutes

TAVILY_URL = "https://api.tavily.com/search"
QUERY = "doctor safety violence hospital news Bihar Muzaffarpur 2025 2026"


@router.get("/feed")
async def news_feed():
    """Fetch latest medical news from Bihar / Muzaffarpur via Tavily."""
    now = time.time()

    # Return cached if fresh
    if _cache["data"] and (now - _cache["ts"]) < CACHE_TTL:
        return {"source": "cache", "results": _cache["data"]}

    api_key = os.getenv("TAVILY_API_KEY", "")
    if not api_key:
        return {"error": "TAVILY_API_KEY not set", "results": []}

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(TAVILY_URL, json={
                "api_key": api_key,
                "query": QUERY,
                "search_depth": "advanced",
                "max_results": 10,
                "include_answer": True,
                "include_raw_content": False,
                "topic": "news",
            })
            resp.raise_for_status()
            data = resp.json()

        results = []
        for item in data.get("results", []):
            results.append({
                "title": item.get("title", ""),
                "url": item.get("url", ""),
                "snippet": item.get("content", "")[:300],
                "source": item.get("url", "").split("/")[2] if "/" in item.get("url", "") else "",
                "score": item.get("score", 0),
            })

        _cache["data"] = results
        _cache["ts"] = now
        return {"source": "tavily", "results": results}

    except Exception as e:
        # Fallback dummy data if API fails
        return {
            "source": "fallback",
            "error": str(e),
            "results": [
                {"title": "Bihar Health Department Announces New Safety Protocol for Doctors",
                 "url": "https://example.com/bihar-health", "snippet": "The Bihar Health Department has introduced new safety measures for healthcare workers across all government hospitals...", "source": "biharhealth.gov.in", "score": 0.9},
                {"title": "Muzaffarpur Medical College Upgrades Emergency Response",
                 "url": "https://example.com/muzaffarpur-medical", "snippet": "SKMCH Muzaffarpur has implemented a rapid response system for doctor safety following recent incidents...", "source": "timesofindia.com", "score": 0.85},
                {"title": "IMA Bihar Demands Stricter Laws Against Violence on Doctors",
                 "url": "https://example.com/ima-bihar", "snippet": "The Indian Medical Association Bihar chapter has demanded stricter enforcement of the Medical Protection Act...", "source": "ndtv.com", "score": 0.8},
            ],
        }
