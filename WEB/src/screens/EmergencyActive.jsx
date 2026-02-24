// Emergency Active (War Mode)
import React, { useState, useEffect } from 'react';
import { useSOS } from '../context/SOSContext';

const STEPS = [
    { key: 'dispatched', label: 'IRU Unit Assigned', icon: '🚨' },
    { key: 'en_route', label: 'Unit En Route', icon: '🚗' },
    { key: 'on_scene', label: 'IRU On Scene', icon: '🛡️' },
    { key: 'lawyer_connected', label: 'Lawyer Connected', icon: '⚖️' },
    { key: 'resolved', label: 'Incident Resolved', icon: '✅' },
];

export default function EmergencyActive({ onViewIRU, onViewLegal, onCancel, onResolved }) {
    const { incident, phase, cancelSOS } = useSOS();
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => { const t = setInterval(() => setElapsed(e => e + 1), 1000); return () => clearInterval(t); }, []);
    useEffect(() => { if (phase === 'resolved') setTimeout(onResolved, 3000); }, [phase]);

    const state = incident?.state || 'dispatched';
    const eta = incident?.eta_minutes ?? 12;
    const unit = incident?.assigned_unit_code || 'MG-21';
    const lead = incident?.team_lead || 'Rajesh Patil';
    const lawyer = incident?.lawyer_name;
    const stateIndex = STEPS.findIndex(s => s.key === state);
    const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--w-bg)' }}>
            {/* Red Banner */}
            <div style={{
                background: 'var(--w-accent)', padding: '52px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                animation: 'pulseRed 1.6s ease-in-out infinite'
            }}>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 900, letterSpacing: 2 }}>🚨 SOS ACTIVE</span>
                <span style={{ color: '#fff', fontSize: 22, fontWeight: 800, fontVariant: 'tabular-nums' }}>{m}:{s}</span>
            </div>

            <div className="screen" style={{ padding: '20px' }}>
                {/* ETA */}
                <div className="glass-card war" style={{ textAlign: 'center', marginBottom: 24, padding: 20 }}>
                    <p style={{ color: 'var(--w-accent-lt)', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>IRU Unit {unit}</p>
                    <p style={{ color: '#fff', fontSize: 40, fontWeight: 900 }}>
                        {state === 'on_scene' || state === 'lawyer_connected' || state === 'resolved' ? '🟢 ON SCENE' : `${eta} MIN ETA`}
                    </p>
                    <p style={{ color: 'var(--w-text-sub)', fontSize: 13, marginTop: 6 }}>Lead: {lead}</p>
                </div>

                {/* Timeline */}
                <p style={{ color: 'var(--w-text-sub)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 14 }}>RESPONSE TIMELINE</p>
                <div className="glass-card war" style={{ padding: '8px 16px', marginBottom: 20 }}>
                    {STEPS.map((step, i) => {
                        const done = i <= stateIndex;
                        const active = i === stateIndex;
                        return (
                            <div key={step.key} style={{
                                display: 'flex', alignItems: 'center', padding: '12px 0',
                                borderBottom: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                            }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: 18, border: `2px solid ${done ? 'var(--w-success)' : 'var(--p-text-muted)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14, fontSize: 18,
                                    opacity: active ? undefined : (done ? 1 : 0.4),
                                    animation: active ? 'pulseRed 1.4s infinite' : 'none'
                                }}>
                                    {step.icon}
                                </div>
                                <span style={{ flex: 1, color: done ? '#fff' : 'var(--w-text-sub)', fontWeight: done ? 600 : 400, fontSize: 14 }}>{step.label}</span>
                                {done && <span style={{ color: 'var(--w-success)', fontWeight: 800, fontSize: 16 }}>✓</span>}
                            </div>
                        );
                    })}
                </div>

                {/* Lawyer */}
                {lawyer && (
                    <div className="fade-in" style={{
                        background: 'rgba(0,230,118,0.08)', borderRadius: 14, border: '1px solid rgba(0,230,118,0.3)',
                        padding: 16, display: 'flex', alignItems: 'center', marginBottom: 20, gap: 14
                    }}>
                        <span style={{ fontSize: 30 }}>⚖️</span>
                        <div style={{ flex: 1 }}>
                            <p style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{lawyer}</p>
                            <p style={{ color: 'var(--w-success)', fontSize: 12, marginTop: 2 }}>Legal representation secured</p>
                        </div>
                        <span style={{
                            color: 'var(--w-success)', fontWeight: 800, fontSize: 11, border: '1px solid var(--w-success)',
                            padding: '3px 8px', borderRadius: 6
                        }}>LIVE</span>
                    </div>
                )}

                {/* Resolved */}
                {phase === 'resolved' && (
                    <div className="fade-in" style={{
                        background: 'rgba(0,230,118,0.15)', borderRadius: 12, border: '1px solid var(--w-success)',
                        padding: 16, textAlign: 'center', marginBottom: 20
                    }}>
                        <p style={{ color: 'var(--w-success)', fontWeight: 700, fontSize: 14 }}>✅ Incident Resolved. Returning to dashboard…</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                    <button className="btn btn-outline" style={{ flex: 1, borderColor: 'var(--w-border)' }} onClick={onViewIRU}>📍 Track IRU</button>
                    <button className="btn" style={{
                        flex: 1, background: 'rgba(37,99,235,0.2)', border: '1px solid var(--p-accent)',
                        color: 'var(--p-accent-lt)', fontWeight: 600
                    }} onClick={onViewLegal}>⚖️ Legal Aid</button>
                </div>
                {phase !== 'resolved' && (
                    <button className="btn btn-outline btn-block" onClick={() => { cancelSOS(); onCancel(); }}>Cancel SOS</button>
                )}
            </div>
        </div>
    );
}
