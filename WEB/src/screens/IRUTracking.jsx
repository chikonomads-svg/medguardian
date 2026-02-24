// IRU Tracking
import React from 'react';
import { IRU_UNITS } from '../data/dummyData';
import { useSOS } from '../context/SOSContext';

export default function IRUTracking({ onBack }) {
    const { incident } = useSOS();
    const unit = IRU_UNITS[0];
    const eta = incident?.eta_minutes ?? 12;

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '52px 20px 16px', borderBottom: '1px solid var(--p-border)', gap: 12 }}>
                {onBack && <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--p-accent)', fontSize: 15, cursor: 'pointer', fontFamily: 'Inter' }}>← Back</button>}
                <h2 style={{ flex: 1, fontSize: 18, fontWeight: 700 }}>IRU Live Tracking</h2>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: 'var(--p-success)' }} />
            </div>

            <div className="screen" style={{ padding: 20 }}>
                {/* Map */}
                <div style={{
                    height: 220, background: '#0E1B2D', borderRadius: 16, border: '1px solid var(--p-border)', overflow: 'hidden',
                    position: 'relative', marginBottom: 20
                }}>
                    {[...Array(6)].map((_, i) => <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, height: 1, top: 40 + i * 36, background: 'rgba(30,58,95,0.6)' }} />)}
                    {[...Array(6)].map((_, i) => <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, width: 1, left: 40 + i * 50, background: 'rgba(30,58,95,0.6)' }} />)}
                    <div style={{ position: 'absolute', bottom: 50, right: 60, textAlign: 'center' }}>
                        <span style={{ fontSize: 22 }}>📍</span>
                        <p style={{ color: 'var(--p-accent)', fontSize: 11, fontWeight: 700 }}>You</p>
                    </div>
                    <div style={{ position: 'absolute', bottom: 80, left: 40, textAlign: 'center', animation: 'markerMove 6s ease-in-out infinite' }}>
                        <span style={{ fontSize: 22 }}>🚨</span>
                        <p style={{ color: 'var(--w-accent-lt)', fontSize: 11, fontWeight: 700 }}>MG-21</p>
                    </div>
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,23,68,0.85)', padding: '6px 12px', borderRadius: 100 }}>
                        <span style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>ETA: {eta} min</span>
                    </div>
                </div>

                {/* Unit */}
                <div className="glass-card" style={{ marginBottom: 16 }}>
                    <div className="flex-between" style={{ marginBottom: 10 }}>
                        <span style={{ fontWeight: 700, fontSize: 16 }}>🚗 Unit {unit.unit_code}</span>
                        <span className="badge dispatched">DISPATCHED</span>
                    </div>
                    <p className="text-sub" style={{ fontSize: 13, marginTop: 4 }}>Team Lead: {unit.team_lead}</p>
                    <p className="text-sub" style={{ fontSize: 13, marginTop: 4 }}>Contact: {unit.phone}</p>
                    <p className="text-sub" style={{ fontSize: 13, marginTop: 4 }}>Vehicle: {unit.vehicle}</p>
                    <p className="text-sub" style={{ fontSize: 13, marginTop: 4 }}>Team Size: {unit.team_size} members</p>
                </div>

                {/* ETA Bar */}
                <div className="glass-card" style={{ marginBottom: 16 }}>
                    <p className="text-sub" style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Estimated Arrival</p>
                    <p style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>{eta} minutes</p>
                    <div style={{ height: 6, background: 'var(--p-border)', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                        <div style={{ height: '100%', background: 'var(--w-accent)', borderRadius: 3, width: `${Math.max(10, 100 - eta * 5)}%`, transition: 'width 0.6s' }} />
                    </div>
                    <p className="text-muted" style={{ fontSize: 12 }}>IRU is approaching your location</p>
                </div>

                {/* Region */}
                <div className="glass-card">
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📡 Coverage Zone</p>
                    <p className="text-sub" style={{ fontSize: 13, marginTop: 3 }}>City: {unit.city}</p>
                    <p className="text-sub" style={{ fontSize: 13, marginTop: 3 }}>Region: {unit.region}</p>
                    <p className="text-sub" style={{ fontSize: 13, marginTop: 3 }}>Coords: {unit.lat}°N, {unit.lng}°E</p>
                </div>
            </div>
        </div>
    );
}
