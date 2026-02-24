"""
MedGuardian - Profile Routes
GET /profile/me       - Get current doctor profile (dummy)
GET /profile/plans    - Get membership plan details
"""
from fastapi import APIRouter, HTTPException
from app.data.dummy_data import DUMMY_DOCTORS, DUMMY_INCIDENTS

router = APIRouter(prefix="/profile", tags=["Profile"])

MEMBERSHIP_PLANS = [
    {
        "id": "basic",
        "name": "Basic Shield",
        "price_inr": 300,
        "billing_cycle": "monthly",
        "features": [
            "SOS Trigger & IRU Dispatch",
            "Legal consultation (2 hrs/month)",
            "Community access",
            "Incident history",
        ],
    },
    {
        "id": "premium",
        "name": "Premium Shield",
        "price_inr": 999,
        "billing_cycle": "monthly",
        "features": [
            "Everything in Basic",
            "Priority IRU dispatch (< 10 min)",
            "Unlimited legal consultation",
            "Media wing access",
            "Evidence vault (5 GB)",
            "Dedicated case manager",
            "24/7 lawyer on-call",
        ],
    },
    {
        "id": "hospital",
        "name": "Hospital Package",
        "price_inr": 4999,
        "billing_cycle": "monthly",
        "features": [
            "Up to 25 doctor licenses",
            "Hospital-level IRU protocol",
            "Institutional legal support",
            "Admin dashboard",
            "Custom training sessions",
        ],
    },
]


@router.get("/me")
async def get_my_profile(doctor_id: str = "doc-001"):
    """Returns the current doctor's profile."""
    doctor = DUMMY_DOCTORS.get(doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    doctor_incidents = [i for i in DUMMY_INCIDENTS if i.get("doctor_id") == doctor_id]
    return {
        "success": True,
        "doctor": doctor,
        "incidents_summary": {
            "total": len(doctor_incidents),
            "resolved": len([i for i in doctor_incidents if i["alert_status"] == "resolved"]),
            "cancelled": len([i for i in doctor_incidents if i["alert_status"] == "cancelled"]),
        },
    }


@router.get("/plans")
async def get_plans():
    """Returns all available membership plans."""
    return {"success": True, "plans": MEMBERSHIP_PLANS, "total": len(MEMBERSHIP_PLANS)}
