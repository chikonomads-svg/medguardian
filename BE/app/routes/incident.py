"""
MedGuardian - Incident Routes
GET /incident/history  - Get dummy historical incidents
GET /incident/{id}     - Get a specific active incident
"""
from fastapi import APIRouter, HTTPException
from app.data.dummy_data import DUMMY_INCIDENTS
from app.services import incident_manager

router = APIRouter(prefix="/incident", tags=["Incidents"])


@router.get("/history")
async def get_incident_history(doctor_id: str = "doc-001"):
    """Returns historical incidents (dummy data)."""
    return {
        "success": True,
        "doctor_id": doctor_id,
        "incidents": DUMMY_INCIDENTS,
        "total": len(DUMMY_INCIDENTS),
    }


@router.get("/active")
async def get_active_incidents():
    """Returns all currently active in-memory incidents."""
    incidents = incident_manager.get_all_incidents()
    active = [i for i in incidents if i["state"] not in ("resolved", "cancelled")]
    return {"success": True, "incidents": active, "total": len(active)}


@router.get("/{incident_id}")
async def get_incident(incident_id: str):
    """Get full details of a specific active incident."""
    incident = incident_manager.get_incident(incident_id)
    if not incident:
        # Try matching in dummy historical data
        hist = next((i for i in DUMMY_INCIDENTS if i["id"] == incident_id), None)
        if hist:
            return {"success": True, "incident": hist}
        raise HTTPException(status_code=404, detail="Incident not found")
    return {"success": True, "incident": incident}
