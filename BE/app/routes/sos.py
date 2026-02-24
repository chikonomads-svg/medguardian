"""
MedGuardian - SOS Routes
POST /sos/trigger        - Trigger a new SOS incident
GET  /sos/status/{id}    - Get current SOS status
PUT  /sos/cancel/{id}    - Cancel an active SOS
GET  /sos/history        - Get user's SOS history
"""
import asyncio
from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.services import incident_manager
from app.services.dispatch_engine import dispatch_and_progress
from app.data.dummy_data import DUMMY_INCIDENTS

router = APIRouter(prefix="/sos", tags=["SOS"])


class SOSTriggerRequest(BaseModel):
    doctor_id: str = "doc-001"
    latitude: float = 19.0760
    longitude: float = 72.8777
    address: Optional[str] = None


@router.post("/trigger")
async def trigger_sos(payload: SOSTriggerRequest, background_tasks: BackgroundTasks):
    """
    Triggers a new SOS emergency incident.
    Starts the IRU dispatch simulation in the background.
    Returns the new incident object immediately.
    """
    incident = incident_manager.create_incident(
        doctor_id=payload.doctor_id,
        latitude=payload.latitude,
        longitude=payload.longitude,
        address=payload.address or "",
    )
    background_tasks.add_task(dispatch_and_progress, incident["id"])
    return {
        "success": True,
        "message": "SOS triggered. IRU dispatch initiated.",
        "incident": incident,
    }


@router.get("/status/{incident_id}")
async def get_sos_status(incident_id: str):
    """Returns the current status of an active SOS incident."""
    incident = incident_manager.get_incident(incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return {"success": True, "incident": incident}


@router.put("/cancel/{incident_id}")
async def cancel_sos(incident_id: str):
    """Cancels an active SOS incident."""
    incident = incident_manager.get_incident(incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    if incident["state"] in ("resolved", "cancelled"):
        raise HTTPException(status_code=400, detail=f"Incident already {incident['state']}")
    updated = incident_manager.cancel_incident(incident_id)
    return {"success": True, "message": "Incident cancelled.", "incident": updated}


@router.get("/history")
async def get_sos_history(doctor_id: str = "doc-001"):
    """Returns historical SOS incidents for a doctor (dummy data)."""
    return {
        "success": True,
        "doctor_id": doctor_id,
        "incidents": DUMMY_INCIDENTS,
        "total": len(DUMMY_INCIDENTS),
    }
