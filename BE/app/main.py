"""
MedGuardian - FastAPI Application Entry Point
Runs at: http://localhost:8000
Docs  at: http://localhost:8000/docs
WebSocket: ws://localhost:8000/ws/incident/{incident_id}
"""
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

from app.routes import sos, iru, incident, legal, media, community, profile
from app.routes import news, legal_chat
from app.websocket.incident_ws import stream_incident_updates

app = FastAPI(
    title="🛡️ MedGuardian API",
    description=(
        "MedGuardian - Physician Safety Ecosystem\n\n"
        "Emergency SOS → IRU Dispatch → Legal Support → Media Management\n\n"
        "**V1: In-memory simulation mode**"
    ),
    version="1.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ---------------------------------------------------------------------------
# CORS — allow all origins for demo / Expo development
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# REST Routers
# ---------------------------------------------------------------------------
app.include_router(sos.router)
app.include_router(iru.router)
app.include_router(incident.router)
app.include_router(legal.router)
app.include_router(media.router)
app.include_router(community.router)
app.include_router(profile.router)
app.include_router(news.router)
app.include_router(legal_chat.router)

# ---------------------------------------------------------------------------
# WebSocket endpoint
# ---------------------------------------------------------------------------
@app.websocket("/ws/incident/{incident_id}")
async def websocket_incident(websocket: WebSocket, incident_id: str):
    """
    Real-time WebSocket for live incident status updates.
    Streams: state, eta_minutes, assigned_unit_code, lawyer_name
    """
    await stream_incident_updates(incident_id, websocket)

# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------
@app.get("/", tags=["Health"])
async def root():
    return {
        "service": "MedGuardian API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs",
        "mode": "V1 — In-memory simulation",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}
