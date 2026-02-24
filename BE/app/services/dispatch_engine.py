"""
MedGuardian - IRU Dispatch Engine
Simulates real-time IRU assignment, ETA calculation, and state progression.
"""
import asyncio
import copy
from typing import Optional

from app.data.dummy_data import IRU_UNITS, DUMMY_LAWYERS
from app.services import incident_manager


def find_available_unit(city: str = "Mumbai") -> Optional[dict]:
    """Find the first available IRU unit in a city."""
    for unit in IRU_UNITS:
        if unit["availability"] == "available" and unit["city"] == city:
            return copy.deepcopy(unit)
    # Fallback: return first available regardless of city
    for unit in IRU_UNITS:
        if unit["availability"] == "available":
            return copy.deepcopy(unit)
    return None


def calculate_eta(unit: dict, incident_lat: float, incident_lon: float) -> int:
    """Rudimentary distance-based ETA in minutes (simulation)."""
    import math
    dlat = abs(unit["current_latitude"] - incident_lat)
    dlon = abs(unit["current_longitude"] - incident_lon)
    distance_deg = math.sqrt(dlat**2 + dlon**2)
    # Very rough: 1 degree ≈ 111 km, avg city speed 40 km/h
    distance_km = distance_deg * 111
    eta = max(5, int((distance_km / 40) * 60))
    return min(eta, 25)  # cap at 25 min for realism


async def dispatch_and_progress(incident_id: str):
    """
    Background coroutine that simulates the full incident lifecycle:
    pending → dispatched → en_route → on_scene → lawyer_connected → resolved
    """
    # Step 1: Find and assign IRU unit
    await asyncio.sleep(2)
    unit = find_available_unit()
    if not unit:
        incident_manager.update_incident(incident_id, state="pending", eta_minutes=None)
        return

    incident = incident_manager.get_incident(incident_id)
    if not incident or incident["state"] == "cancelled":
        return

    eta = calculate_eta(unit, incident["latitude"], incident["longitude"])

    incident_manager.update_incident(
        incident_id,
        state="dispatched",
        assigned_unit=unit["unit_id"],
        assigned_unit_code=unit["unit_code"],
        team_lead=unit["team_lead"],
        team_lead_phone=unit["team_lead_phone"],
        eta_minutes=eta,
    )

    # Step 2: En route
    await asyncio.sleep(5)
    if incident_manager.get_incident(incident_id)["state"] == "cancelled":
        return
    incident_manager.update_incident(incident_id, state="en_route", eta_minutes=max(1, eta - 3))

    # Step 3: On scene
    wait_time = min(eta * 2, 20)  # simulate arrival time (seconds in demo)
    await asyncio.sleep(wait_time)
    if incident_manager.get_incident(incident_id)["state"] == "cancelled":
        return
    incident_manager.update_incident(incident_id, state="on_scene", eta_minutes=0)

    # Step 4: Lawyer connected
    await asyncio.sleep(8)
    if incident_manager.get_incident(incident_id)["state"] == "cancelled":
        return
    lawyer = DUMMY_LAWYERS[0]
    incident_manager.update_incident(
        incident_id,
        state="lawyer_connected",
        lawyer_name=lawyer["full_name"],
        lawyer_phone=lawyer["phone"],
    )

    # Step 5: Resolved (after 30 more seconds in demo)
    await asyncio.sleep(30)
    if incident_manager.get_incident(incident_id)["state"] not in ("cancelled", "resolved"):
        incident_manager.resolve_incident(incident_id)
