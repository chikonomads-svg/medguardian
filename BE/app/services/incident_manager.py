"""
MedGuardian - Incident Manager Service
In-memory lifecycle manager for all active incidents.
"""
import uuid
from datetime import datetime
from typing import Dict, Optional

# Incident states
STATES = [
    "pending",        # SOS triggered, not yet dispatched
    "dispatched",     # IRU unit assigned and dispatched
    "en_route",       # IRU en route to location
    "on_scene",       # IRU arrived at location
    "lawyer_connected", # Lawyer joined
    "resolved",       # Incident resolved
    "cancelled",      # Cancelled by doctor
]

# In-memory store: incident_id -> incident dict
_incidents: Dict[str, dict] = {}


def create_incident(doctor_id: str, latitude: float, longitude: float, address: str = "") -> dict:
    incident_id = str(uuid.uuid4())
    incident = {
        "id": incident_id,
        "doctor_id": doctor_id,
        "state": "pending",
        "latitude": latitude,
        "longitude": longitude,
        "address": address or f"Location ({latitude:.4f}, {longitude:.4f})",
        "assigned_unit": None,
        "assigned_unit_code": None,
        "team_lead": None,
        "team_lead_phone": None,
        "eta_minutes": None,
        "lawyer_name": None,
        "lawyer_phone": None,
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat(),
        "resolved_at": None,
    }
    _incidents[incident_id] = incident
    return incident


def get_incident(incident_id: str) -> Optional[dict]:
    return _incidents.get(incident_id)


def update_incident(incident_id: str, **kwargs) -> Optional[dict]:
    if incident_id not in _incidents:
        return None
    _incidents[incident_id].update(kwargs)
    _incidents[incident_id]["updated_at"] = datetime.now().isoformat()
    return _incidents[incident_id]


def get_all_incidents() -> list:
    return list(_incidents.values())


def cancel_incident(incident_id: str) -> Optional[dict]:
    return update_incident(incident_id, state="cancelled", resolved_at=datetime.now().isoformat())


def resolve_incident(incident_id: str) -> Optional[dict]:
    return update_incident(incident_id, state="resolved", resolved_at=datetime.now().isoformat())
