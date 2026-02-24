"""
MedGuardian - WebSocket Handler for Live Incident Updates
Streams real-time state transitions to connected clients.
"""
import asyncio
import json
from typing import Dict, List
from fastapi import WebSocket, WebSocketDisconnect


class ConnectionManager:
    """Manages active WebSocket connections per incident."""

    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, incident_id: str, websocket: WebSocket):
        await websocket.accept()
        if incident_id not in self.active_connections:
            self.active_connections[incident_id] = []
        self.active_connections[incident_id].append(websocket)

    def disconnect(self, incident_id: str, websocket: WebSocket):
        if incident_id in self.active_connections:
            self.active_connections[incident_id].remove(websocket)

    async def broadcast(self, incident_id: str, data: dict):
        connections = self.active_connections.get(incident_id, [])
        dead = []
        for ws in connections:
            try:
                await ws.send_text(json.dumps(data))
            except Exception:
                dead.append(ws)
        for ws in dead:
            connections.remove(ws)


manager = ConnectionManager()


async def stream_incident_updates(incident_id: str, websocket: WebSocket):
    """
    WebSocket endpoint handler: streams live incident state to client.
    Polls incident state every 2 seconds and pushes updates.
    """
    from app.services import incident_manager

    await manager.connect(incident_id, websocket)
    last_state = None

    try:
        while True:
            incident = incident_manager.get_incident(incident_id)
            if not incident:
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "message": "Incident not found"
                }))
                break

            current_state = incident["state"]
            if current_state != last_state:
                payload = {
                    "type": "incident_update",
                    "incident_id": incident_id,
                    "state": incident["state"],
                    "eta_minutes": incident.get("eta_minutes"),
                    "assigned_unit_code": incident.get("assigned_unit_code"),
                    "team_lead": incident.get("team_lead"),
                    "team_lead_phone": incident.get("team_lead_phone"),
                    "lawyer_name": incident.get("lawyer_name"),
                    "lawyer_phone": incident.get("lawyer_phone"),
                    "updated_at": incident.get("updated_at"),
                }
                await websocket.send_text(json.dumps(payload))
                last_state = current_state

            # Terminal states — close after sending
            if current_state in ("resolved", "cancelled"):
                break

            await asyncio.sleep(2)

    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(incident_id, websocket)
