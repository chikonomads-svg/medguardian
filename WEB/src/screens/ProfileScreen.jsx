// Profile Screen
import React from 'react';
import { DOCTOR, INCIDENTS } from '../data/dummyData';

const MENU = [
    { icon: '📋', label: 'Incident History' },
    { icon: '💳', label: 'My Membership' },
    { icon: '🔒', label: 'Security Settings' },
    { icon: '📞', label: 'Emergency Contacts' },
    { icon: '📚', label: 'Safety Guidelines' },
    { icon: '⚙️', label: 'App Settings' },
];

export default function ProfileScreen({ onLogout }) {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
            {/* Hero */}
            <div style={{
                background: 'linear-gradient(180deg,#0D1E40,#0A1628)', padding: '60px 20px 28px', textAlign: 'center',
                borderBottom: '1px solid var(--p-border)'
            }}>
                <div style={{
                    width: 80, height: 80, borderRadius: 40, background: 'var(--p-accent)', display: 'inline-flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: 12, boxShadow: '0 6px 24px var(--p-accent-glow)', fontSize: 30, fontWeight: 800, color: '#fff'
                }}>
                    {DOCTOR.initials}
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>{DOCTOR.full_name}</h2>
                <p className="text-sub" style={{ fontSize: 13, marginTop: 3 }}>{DOCTOR.specialty}</p>
                <p className="text-muted" style={{ fontSize: 12, marginTop: 2 }}>{DOCTOR.hospital}</p>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, background: 'rgba(37,99,235,0.2)',
                    padding: '6px 16px', borderRadius: 100, border: '1px solid var(--p-accent)'
                }}>
                    <span style={{ fontSize: 14 }}>⭐</span>
                    <span style={{ color: 'var(--p-accent)', fontWeight: 700, fontSize: 13 }}>{DOCTOR.membership}</span>
                </div>
            </div>

            <div className="screen" style={{ padding: '16px 20px' }}>
                {/* Stats */}
                <div style={{
                    display: 'flex', background: 'var(--p-card)', borderRadius: 14, border: '1px solid var(--p-border)',
                    marginBottom: 18, padding: '16px 0'
                }}>
                    {[{ v: DOCTOR.incidents_count, l: 'Incidents' }, { v: 2, l: 'Legal Cases' }, { v: '2yr', l: 'Member Since' }].map((s, i) => (
                        <React.Fragment key={s.l}>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <p style={{ fontSize: 22, fontWeight: 800 }}>{s.v}</p>
                                <p className="text-sub" style={{ fontSize: 11, marginTop: 2 }}>{s.l}</p>
                            </div>
                            {i < 2 && <div style={{ width: 1, background: 'var(--p-border)' }} />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Info */}
                <div className="glass-card" style={{ marginBottom: 18 }}>
                    <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Doctor Details</p>
                    {[['Email', DOCTOR.email], ['Phone', DOCTOR.phone], ['MRN', DOCTOR.mrn], ['Valid Until', DOCTOR.valid_until]].map(([l, v]) => (
                        <div key={l} className="flex-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--p-border)' }}>
                            <span className="text-muted" style={{ fontSize: 13 }}>{l}</span>
                            <span className="text-sub" style={{ fontSize: 13, fontWeight: 600 }}>{v}</span>
                        </div>
                    ))}
                </div>

                {/* Recent Incidents */}
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Recent Incidents</h3>
                {INCIDENTS.map(inc => (
                    <div className="glass-card" key={inc.id} style={{ marginBottom: 10 }}>
                        <div className="flex-between" style={{ marginBottom: 6 }}>
                            <span style={{ fontWeight: 700, fontSize: 14, flex: 1, marginRight: 8 }}>{inc.location}</span>
                            <span className={`badge ${inc.status}`}>{inc.status}</span>
                        </div>
                        <p className="text-sub" style={{ fontSize: 13 }}>📅 {inc.date} · 🚑 {inc.unit || 'N/A'}</p>
                    </div>
                ))}

                {/* Menu */}
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '18px 0 12px' }}>Account</h3>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    {MENU.map((m, i) => (
                        <button key={m.label} style={{
                            display: 'flex', alignItems: 'center', width: '100%', padding: '15px 18px',
                            background: 'none', border: 'none', borderBottom: i < MENU.length - 1 ? '1px solid var(--p-border)' : 'none',
                            cursor: 'pointer', fontFamily: 'Inter'
                        }}>
                            <span style={{ fontSize: 18, marginRight: 14 }}>{m.icon}</span>
                            <span style={{ flex: 1, textAlign: 'left', color: 'var(--p-text)', fontSize: 15 }}>{m.label}</span>
                            <span className="text-muted" style={{ fontSize: 20 }}>›</span>
                        </button>
                    ))}
                </div>

                <button className="btn btn-danger btn-block" style={{ marginTop: 20, padding: 14 }} onClick={onLogout}>Log Out</button>
                <p className="text-muted" style={{ fontSize: 11, textAlign: 'center', margin: '12px 0' }}>MedGuardian v1.0.0 · MedShield™</p>
            </div>
        </div>
    );
}
