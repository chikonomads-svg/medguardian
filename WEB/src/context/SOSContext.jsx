// MedGuardian — SOS Context (Web)
import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

const SOSContext = createContext();
export const useSOS = () => useContext(SOSContext);

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const STATES = ['dispatched', 'en_route', 'on_scene', 'lawyer_connected', 'resolved'];

export function SOSProvider({ children }) {
    const [phase, setPhase] = useState('idle'); // idle | countdown | active | resolved | cancelled
    const [incident, setIncident] = useState(null);
    const wsRef = useRef(null);
    const mockRef = useRef(null);

    const triggerSOS = useCallback(async () => {
        setPhase('countdown');
        try {
            const res = await fetch(`${API}/sos/trigger`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doctor_id: 'doc-001', latitude: 19.076, longitude: 72.8777 }),
            });
            const data = await res.json();
            setIncident(data.incident);
            setPhase('active');
            connectWebSocket(data.incident.id);
        } catch {
            // Offline mock
            const mockId = 'mock-' + Date.now();
            const mock = {
                id: mockId, state: 'pending', assigned_unit_code: 'MG-21',
                team_lead: 'Rajesh Patil', eta_minutes: 12, lawyer_name: null
            };
            setIncident(mock);
            setPhase('active');
            startMockFlow(mock);
        }
    }, []);

    function connectWebSocket(incidentId) {
        try {
            const ws = new WebSocket(`ws://localhost:8000/ws/incident/${incidentId}`);
            ws.onmessage = (e) => {
                const data = JSON.parse(e.data);
                setIncident(prev => ({ ...prev, ...data }));
                if (data.state === 'resolved') { setPhase('resolved'); ws.close(); }
            };
            ws.onerror = () => startMockFlow(incident);
            wsRef.current = ws;
        } catch { startMockFlow(incident); }
    }

    function startMockFlow(mock) {
        let idx = 0;
        mockRef.current = setInterval(() => {
            if (idx >= STATES.length) { clearInterval(mockRef.current); return; }
            const state = STATES[idx];
            const updates = { state };
            if (state === 'dispatched') { updates.assigned_unit_code = 'MG-21'; updates.team_lead = 'Rajesh Patil'; updates.eta_minutes = 12; }
            if (state === 'en_route') updates.eta_minutes = 8;
            if (state === 'on_scene') updates.eta_minutes = 0;
            if (state === 'lawyer_connected') updates.lawyer_name = 'Adv. Priya Sharma';
            if (state === 'resolved') { setPhase('resolved'); clearInterval(mockRef.current); }
            setIncident(prev => ({ ...prev, ...updates }));
            idx++;
        }, 4000);
    }

    const cancelSOS = useCallback(() => {
        setPhase('cancelled');
        if (wsRef.current) wsRef.current.close();
        if (mockRef.current) clearInterval(mockRef.current);
        setTimeout(() => { setPhase('idle'); setIncident(null); }, 1500);
    }, []);

    const resetSOS = useCallback(() => { setPhase('idle'); setIncident(null); }, []);

    return (
        <SOSContext.Provider value={{ phase, incident, triggerSOS, cancelSOS, resetSOS }}>
            {children}
        </SOSContext.Provider>
    );
}
