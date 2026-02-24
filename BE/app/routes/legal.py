"""
MedGuardian - Legal Support Routes
GET  /legal/cases            - Get dummy legal cases
GET  /legal/fir-template     - Get FIR draft template
GET  /legal/lawyers          - Get available lawyers
"""
from fastapi import APIRouter
from app.data.dummy_data import DUMMY_LAWYERS, FIR_TEMPLATE, DUMMY_INCIDENTS

router = APIRouter(prefix="/legal", tags=["Legal"])


@router.get("/cases")
async def get_legal_cases(doctor_id: str = "doc-001"):
    """Returns legal cases derived from incident history."""
    cases = [
        {
            "id": f"case-{i['id']}",
            "incident_id": i["id"],
            "doctor_id": doctor_id,
            "status": "settled" if i["alert_status"] == "resolved" else "closed",
            "lawyer_assigned": i.get("lawyer_assigned"),
            "location": i.get("location_address"),
            "triggered_at": i.get("trigger_time"),
            "description": i.get("description"),
        }
        for i in DUMMY_INCIDENTS
        if i.get("alert_status") in ("resolved",)
    ]
    return {"success": True, "cases": cases, "total": len(cases)}


@router.get("/fir-template")
async def get_fir_template():
    """Returns the standard MedGuardian FIR draft template."""
    return {"success": True, "template": FIR_TEMPLATE}


@router.get("/lawyers")
async def get_available_lawyers():
    """Returns list of available lawyers."""
    available = [l for l in DUMMY_LAWYERS if l.get("is_available")]
    return {"success": True, "lawyers": available, "total": len(available)}
