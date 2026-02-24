// MedGuardian — SOS Context
// Manages emergency state, WebSocket connection, and incident lifecycle.
import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const API_BASE = 'http://localhost:8000';
const WS_BASE = 'ws://localhost:8000';

const SOSContext = createContext(null);

export function SOSProvider({ children }) {
    const [phase, setPhase] = useState('idle');
    // phases: idle | countdown | active | resolved | cancelled
    const [incident, setIncident] = useState(null);
    const wsRef = useRef(null);

    const triggerSOS = useCallback(async (doctorId = 'doc-001', lat = 19.076, lon = 72.8777) => {
        setPhase('countdown');
        try {
            const res = await fetch(`${API_BASE}/sos/trigger`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doctor_id: doctorId, latitude: lat, longitude: lon }),
            });
            const data = await res.json();
            if (data.success) {
                setIncident(data.incident);
                setPhase('active');
                _openWebSocket(data.incident.id);
            }
        } catch (err) {
            // Offline fallback — use simulated incident
            const mockIncident = {
                id: 'mock-' + Date.now(),
                state: 'dispatched',
                assigned_unit_code: 'MG-21',
                team_lead: 'Rajesh Patil',
                team_lead_phone: '+91-9900112233',
                eta_minutes: 12,
                lawyer_name: null,
                lawyer_phone: null,
            };
            setIncident(mockIncident);
            setPhase('active');
        }
    }, []);

    const cancelSOS = useCallback(async () => {
        if (incident?.id && !incident.id.startsWith('mock-')) {
            try {
                await fetch(`${API_BASE}/sos/cancel/${incident.id}`, { method: 'PUT' });
            } catch (_) { }
        }
        wsRef.current?.close();
        setPhase('cancelled');
        setIncident(null);
    }, [incident]);

    const resetSOS = useCallback(() => {
        wsRef.current?.close();
        setPhase('idle');
        setIncident(null);
    }, []);

    function _openWebSocket(incidentId) {
        const ws = new WebSocket(`${WS_BASE}/ws/incident/${incidentId}`);
        wsRef.current = ws;

        ws.onmessage = (e) => {
            const payload = JSON.parse(e.data);
            if (payload.type === 'incident_update') {
                setIncident((prev) => ({ ...prev, ...payload }));
                if (payload.state === 'resolved') {
                    setPhase('resolved');
                    ws.close();
                }
            }
        };

        ws.onerror = () => ws.close();
    }

    return (
        <SOSContext.Provider value={{ phase, incident, triggerSOS, cancelSOS, resetSOS }}>
            {children}
        </SOSContext.Provider>
    );
}

export const useSOS = () => useContext(SOSContext);
