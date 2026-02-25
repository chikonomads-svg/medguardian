"""
MedGuardian — News Feed (Tavily Search API)
Fetches medical news: Bihar/Muzaffarpur local + India + World
"""
import os
import time
import httpx
from fastapi import APIRouter

router = APIRouter(prefix="/news", tags=["News"])

# ── In-memory cache (15 min TTL) ──
_cache = {"data": None, "ts": 0}
CACHE_TTL = 900

TAVILY_URL = "https://api.tavily.com/search"

QUERIES = [
    {"label": "🏥 Bihar & Muzaffarpur", "query": "doctor hospital healthcare news Bihar Muzaffarpur", "max": 4},
    {"label": "🇮🇳 India Medical News", "query": "doctor safety violence healthcare India news", "max": 4},
    {"label": "🌍 World Health News", "query": "global health medical breakthrough WHO news 2025 2026", "max": 3},
]


async def _search(client, api_key, query, max_results):
    """Single Tavily search."""
    try:
        resp = await client.post(TAVILY_URL, json={
            "api_key": api_key,
            "query": query,
            "search_depth": "basic",
            "max_results": max_results,
            "include_answer": False,
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
        return results
    except Exception:
        return []


@router.get("/feed")
async def news_feed():
    """Fetch categorized medical news via Tavily."""
    now = time.time()

    if _cache["data"] and (now - _cache["ts"]) < CACHE_TTL:
        return {"source": "cache", "sections": _cache["data"]}

    api_key = os.getenv("TAVILY_API_KEY", "")
    if not api_key:
        return {"error": "TAVILY_API_KEY not set", "sections": _fallback()}

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            sections = []
            for q in QUERIES:
                results = await _search(client, api_key, q["query"], q["max"])
                sections.append({"label": q["label"], "results": results})

        _cache["data"] = sections
        _cache["ts"] = now
        return {"source": "tavily", "sections": sections}

    except Exception as e:
        return {"source": "fallback", "error": str(e), "sections": _fallback()}


def _fallback():
    return [
        {"label": "🏥 Bihar & Muzaffarpur", "results": [
            {"title": "Bihar Health Dept Announces New Safety Protocol for Doctors", "url": "#", "snippet": "New safety measures introduced for healthcare workers across all government hospitals in Bihar...", "source": "biharhealth.gov.in", "score": 0.9},
            {"title": "Muzaffarpur SKMCH Upgrades Emergency Response", "url": "#", "snippet": "SKMCH Muzaffarpur implements rapid response system for doctor safety following recent incidents...", "source": "timesofindia.com", "score": 0.85},
        ]},
        {"label": "🇮🇳 India Medical News", "results": [
            {"title": "IMA Demands Stricter Central Law Against Doctor Violence", "url": "#", "snippet": "Indian Medical Association demands nationwide enforcement of the Medical Protection Act...", "source": "ndtv.com", "score": 0.8},
            {"title": "NMC Issues Guidelines on Hospital Security Standards", "url": "#", "snippet": "National Medical Commission releases new hospital security advisory for all states...", "source": "thehindu.com", "score": 0.75},
        ]},
        {"label": "🌍 World Health News", "results": [
            {"title": "WHO Report: Healthcare Worker Safety a Global Priority", "url": "#", "snippet": "World Health Organization highlights increasing violence against healthcare workers worldwide...", "source": "who.int", "score": 0.7},
        ]},
    ]
