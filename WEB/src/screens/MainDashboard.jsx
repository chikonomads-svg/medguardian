// Main Dashboard (Peace Mode)
import React from 'react';
import { DOCTOR, INCIDENTS } from '../data/dummyData';
import { useSOS } from '../context/SOSContext';

const STATS = [
    { icon: '🛡️', label: 'Incidents Handled', value: '2' },
    { icon: '⚖️', label: 'Legal Cases', value: '2' },
    { icon: '🚑', label: 'IRU Nearby', value: '2' },
    { icon: '👨‍⚕️', label: 'Community', value: '5,200+' },
];

export default function MainDashboard({ onSOS }) {
    const { phase } = useSOS();

    return (
        <div className="screen" style={{ padding: '16px 20px 24px' }}>
            {/* Header */}
            <div className="flex-between fade-in" style={{ marginBottom: 16 }}>
                <div>
                    <p style={{ color: 'var(--p-text-muted)', fontSize: 13 }}>Good evening,</p>
                    <h1 style={{ fontSize: 20, fontWeight: 800 }}>{DOCTOR.full_name}</h1>
                    <p style={{ color: 'var(--p-text-muted)', fontSize: 12, marginTop: 2 }}>{DOCTOR.hospital}</p>
                </div>
                <span style={{
                    background: 'rgba(37,99,235,0.2)', border: '1px solid var(--p-accent)',
                    borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: 'var(--p-accent)'
                }}>
                    ⭐ Premium
                </span>
            </div>

            {/* Status Banner */}
            <div className="glass-card fade-in-up" style={{ marginBottom: 20 }}>
                <div className="flex-row" style={{ gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--p-success)' }} />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Shield Active — You are protected</span>
                </div>
                <p style={{ color: 'var(--p-text-sub)', fontSize: 12 }}>IRU Unit MG-21 is 2.4 km away</p>
            </div>

            {/* SOS Button */}
            <div className="fade-in-up" style={{ textAlign: 'center', margin: '28px 0' }}>
                <p style={{ color: 'var(--p-text-muted)', fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>
                    EMERGENCY SOS
                </p>
                <button onClick={onSOS} disabled={phase !== 'idle'}
                    style={{
                        width: 140, height: 140, borderRadius: '50%', border: '3px solid var(--p-shield)',
                        background: 'radial-gradient(circle, var(--p-shield) 0%, #0F1E3A 80%)',
                        color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', letterSpacing: 1,
                        boxShadow: '0 0 30px var(--p-shield-glow), 0 0 60px rgba(29,78,216,0.2)',
                        animation: 'pulse 3s ease-in-out infinite, glow 3s ease-in-out infinite',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                    }}>
                    <span style={{ fontSize: 36 }}>🛡️</span>
                    <span>HOLD FOR</span>
                    <span>SOS</span>
                </button>
            </div>

            {/* Stats Grid */}
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Your Protection Overview</h3>
            <div className="responsive-grid" style={{ marginBottom: 20 }}>
                {STATS.map(s => (
                    <div className="glass-card fade-in-up" key={s.label} style={{ textAlign: 'center', padding: 16 }}>
                        <span style={{ fontSize: 28 }}>{s.icon}</span>
                        <p style={{ fontSize: 22, fontWeight: 800, margin: '6px 0 2px' }}>{s.value}</p>
                        <p style={{ color: 'var(--p-text-sub)', fontSize: 11 }}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Incidents */}
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Recent Incidents</h3>
            {INCIDENTS.slice(0, 2).map(inc => (
                <div className="glass-card fade-in-up" key={inc.id} style={{ marginBottom: 8 }}>
                    <div className="flex-between">
                        <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 600, fontSize: 14 }}>{inc.location}</p>
                            <p style={{ color: 'var(--p-text-sub)', fontSize: 12, marginTop: 2 }}>{inc.date}</p>
                        </div>
                        <span className={`badge ${inc.status}`}>{inc.status}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
