"""
MedGuardian - IRU Routes
GET /iru/status/{incident_id}  - Get IRU assignment for an incident
GET /iru/units/nearby          - Get nearby available IRU units  
GET /iru/units                 - Get all IRU units
"""
from fastapi import APIRouter, HTTPException
from app.data.dummy_data import IRU_UNITS
from app.services import incident_manager

router = APIRouter(prefix="/iru", tags=["IRU"])


@router.get("/status/{incident_id}")
async def get_iru_status(incident_id: str):
    """Returns the IRU unit assigned to an incident."""
    incident = incident_manager.get_incident(incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")

    unit_id = incident.get("assigned_unit")
    unit = None
    if unit_id:
        unit = next((u for u in IRU_UNITS if u["unit_id"] == unit_id), None)

    return {
        "success": True,
        "incident_id": incident_id,
        "state": incident["state"],
        "eta_minutes": incident.get("eta_minutes"),
        "assigned_unit": unit,
    }


@router.get("/units/nearby")
async def get_nearby_units(city: str = "Mumbai"):
    """Returns nearby available IRU units for a city."""
    units = [u for u in IRU_UNITS if u.get("city", "").lower() == city.lower()]
    if not units:
        units = IRU_UNITS
    return {
        "success": True,
        "city": city,
        "units": units,
        "total": len(units),
    }


@router.get("/units")
async def get_all_units():
    """Returns all registered IRU units."""
    return {
        "success": True,
        "units": IRU_UNITS,
        "total": len(IRU_UNITS),
    }
