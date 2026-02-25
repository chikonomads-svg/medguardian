// Profile Screen — with Account Sub-Features
import React, { useState, useEffect } from 'react';
import { DOCTOR, INCIDENTS } from '../data/dummyData';

const SAFETY_GUIDELINES = [
    { title: '🚨 During an Attack', tips: ['Stay calm, do not retaliate', 'Activate MedGuardian SOS', 'Move to a safe area with CCTV coverage', 'Call hospital security immediately'] },
    { title: '📱 Document Everything', tips: ['Record video if safe to do so', 'Note names of witnesses', 'Preserve torn clothing/evidence', 'Take photos of injuries'] },
    { title: '📋 After an Incident', tips: ['File FIR within 24 hours', 'Get medico-legal examination', 'Report to hospital administration', 'Contact IMA for support'] },
    { title: '🛡️ Prevention', tips: ['Display security guidelines visibly', 'Ensure proper waiting area management', 'Communicate prognosis clearly', 'Avoid being alone during high-risk hours'] },
];

export default function ProfileScreen({ user, onLogout }) {
    const [activePanel, setActivePanel] = useState(null);
    const [contacts, setContacts] = useState(() => {
        try { return JSON.parse(localStorage.getItem('mg_emergency_contacts')) || []; } catch { return []; }
    });
    const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        localStorage.setItem('mg_emergency_contacts', JSON.stringify(contacts));
    }, [contacts]);

    const displayName = user?.name || DOCTOR.full_name;
    const displayEmail = user?.email || DOCTOR.email;
    const displayPhone = user?.phone || DOCTOR.phone;

    function togglePanel(key) {
        setActivePanel(activePanel === key ? null : key);
    }

    function addContact() {
        if (!newContact.name || !newContact.phone) return;
        setContacts([...contacts, { ...newContact, id: Date.now() }]);
        setNewContact({ name: '', phone: '', relation: '' });
    }

    function removeContact(id) {
        setContacts(contacts.filter(c => c.id !== id));
    }

    const inputStyle = {
        width: '100%', padding: '10px 12px', background: 'var(--p-bg2)', color: '#fff',
        fontSize: 13, border: '1px solid var(--p-border)', borderRadius: 8,
        outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box',
    };

    const MENU = [
        { key: 'incidents', icon: '📋', label: 'Incident History' },
        { key: 'membership', icon: '💳', label: 'My Membership' },
        { key: 'security', icon: '🔒', label: 'Security Settings' },
        { key: 'contacts', icon: '📞', label: 'Emergency Contacts' },
        { key: 'guidelines', icon: '📚', label: 'Safety Guidelines' },
        { key: 'settings', icon: '⚙️', label: 'App Settings' },
    ];

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
                    {displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>{displayName}</h2>
                <p className="text-sub" style={{ fontSize: 13, marginTop: 3 }}>{displayEmail}</p>
                <p className="text-muted" style={{ fontSize: 12, marginTop: 2 }}>{displayPhone}</p>
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

                {/* Account Menu */}
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Account</h3>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
                    {MENU.map((m, i) => (
                        <div key={m.key}>
                            <button onClick={() => togglePanel(m.key)} style={{
                                display: 'flex', alignItems: 'center', width: '100%', padding: '15px 18px',
                                background: activePanel === m.key ? 'rgba(37,99,235,0.08)' : 'none',
                                border: 'none', borderBottom: '1px solid var(--p-border)',
                                cursor: 'pointer', fontFamily: 'Inter', transition: 'background 0.2s',
                            }}>
                                <span style={{ fontSize: 18, marginRight: 14 }}>{m.icon}</span>
                                <span style={{ flex: 1, textAlign: 'left', color: 'var(--p-text)', fontSize: 15 }}>{m.label}</span>
                                <span className="text-muted" style={{ fontSize: 16, transition: 'transform 0.2s', transform: activePanel === m.key ? 'rotate(90deg)' : 'none' }}>›</span>
                            </button>

                            {/* ── Incident History Panel ── */}
                            {activePanel === 'incidents' && m.key === 'incidents' && (
                                <div style={{ padding: '12px 18px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--p-border)' }}>
                                    {INCIDENTS.map(inc => (
                                        <div key={inc.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--p-border)' }}>
                                            <div className="flex-between">
                                                <span style={{ fontWeight: 700, fontSize: 13 }}>{inc.location}</span>
                                                <span className={`badge ${inc.status}`} style={{ fontSize: 10 }}>{inc.status}</span>
                                            </div>
                                            <p className="text-sub" style={{ fontSize: 12, marginTop: 4 }}>📅 {inc.date} · 🚑 {inc.unit || 'N/A'}</p>
                                        </div>
                                    ))}
                                    {INCIDENTS.length === 0 && <p className="text-muted" style={{ fontSize: 13 }}>No incidents recorded</p>}
                                </div>
                            )}

                            {/* ── Membership Panel ── */}
                            {activePanel === 'membership' && m.key === 'membership' && (
                                <div style={{ padding: '16px 18px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--p-border)' }}>
                                    <div style={{
                                        background: 'linear-gradient(135deg, #1e3a5f, #2563eb)', borderRadius: 14, padding: '20px',
                                        border: '1px solid rgba(37,99,235,0.5)', position: 'relative', overflow: 'hidden'
                                    }}>
                                        <div style={{ position: 'absolute', top: -20, right: -20, fontSize: 80, opacity: 0.1 }}>🛡️</div>
                                        <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 }}>MEMBERSHIP</p>
                                        <p style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>⭐ {DOCTOR.membership}</p>
                                        <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
                                            <div><p className="text-muted" style={{ fontSize: 10 }}>MRN</p><p style={{ fontWeight: 700, fontSize: 14 }}>{DOCTOR.mrn}</p></div>
                                            <div><p className="text-muted" style={{ fontSize: 10 }}>Valid Until</p><p style={{ fontWeight: 700, fontSize: 14 }}>{DOCTOR.valid_until}</p></div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 12 }}>
                                        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Benefits</p>
                                        {['24/7 SOS response', 'Legal AI assistant', 'IRU dispatch priority', 'Incident documentation', 'Community access'].map(b => (
                                            <p key={b} style={{ fontSize: 12, color: 'var(--p-text-sub)', padding: '4px 0' }}>✅ {b}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── Security Settings Panel ── */}
                            {activePanel === 'security' && m.key === 'security' && (
                                <div style={{ padding: '16px 18px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--p-border)' }}>
                                    <div style={{ marginBottom: 16 }}>
                                        <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Change Password</p>
                                        <input placeholder="Current password" type="password" style={{ ...inputStyle, marginBottom: 8 }} />
                                        <input placeholder="New password" type="password" style={{ ...inputStyle, marginBottom: 8 }} />
                                        <input placeholder="Confirm new password" type="password" style={{ ...inputStyle, marginBottom: 10 }} />
                                        <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: 12 }}>Update Password</button>
                                    </div>
                                    <div className="flex-between" style={{ padding: '12px 0', borderTop: '1px solid var(--p-border)' }}>
                                        <div>
                                            <p style={{ fontSize: 13, fontWeight: 600 }}>Two-Factor Auth</p>
                                            <p className="text-muted" style={{ fontSize: 11 }}>Extra security via SMS</p>
                                        </div>
                                        <div onClick={() => { }} style={{
                                            width: 44, height: 24, borderRadius: 12, background: 'var(--p-accent)',
                                            position: 'relative', cursor: 'pointer',
                                        }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 2, right: 2 }} />
                                        </div>
                                    </div>
                                    <div className="flex-between" style={{ padding: '12px 0', borderTop: '1px solid var(--p-border)' }}>
                                        <div>
                                            <p style={{ fontSize: 13, fontWeight: 600 }}>Biometric Login</p>
                                            <p className="text-muted" style={{ fontSize: 11 }}>Fingerprint / Face ID</p>
                                        </div>
                                        <div style={{
                                            width: 44, height: 24, borderRadius: 12, background: 'rgba(255,255,255,0.2)',
                                            position: 'relative', cursor: 'pointer',
                                        }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 2, left: 2 }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Emergency Contacts Panel ── */}
                            {activePanel === 'contacts' && m.key === 'contacts' && (
                                <div style={{ padding: '16px 18px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--p-border)' }}>
                                    {contacts.map(c => (
                                        <div key={c.id} className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--p-border)' }}>
                                            <div>
                                                <p style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</p>
                                                <p className="text-muted" style={{ fontSize: 11 }}>{c.relation} · {c.phone}</p>
                                            </div>
                                            <button onClick={() => removeContact(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#ef4444' }}>✕</button>
                                        </div>
                                    ))}
                                    {contacts.length === 0 && <p className="text-muted" style={{ fontSize: 12, marginBottom: 12 }}>No emergency contacts added</p>}
                                    <div style={{ marginTop: 12, padding: '12px', background: 'var(--p-card)', borderRadius: 10 }}>
                                        <p style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>➕ Add Contact</p>
                                        <input value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} placeholder="Name" style={{ ...inputStyle, marginBottom: 6 }} />
                                        <input value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} placeholder="Phone" style={{ ...inputStyle, marginBottom: 6 }} />
                                        <input value={newContact.relation} onChange={e => setNewContact({ ...newContact, relation: e.target.value })} placeholder="Relation (e.g. Spouse)" style={{ ...inputStyle, marginBottom: 8 }} />
                                        <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: 12, width: '100%' }} onClick={addContact}>Add Contact</button>
                                    </div>
                                </div>
                            )}

                            {/* ── Safety Guidelines Panel ── */}
                            {activePanel === 'guidelines' && m.key === 'guidelines' && (
                                <div style={{ padding: '16px 18px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--p-border)' }}>
                                    {SAFETY_GUIDELINES.map(g => (
                                        <div key={g.title} style={{ marginBottom: 14 }}>
                                            <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{g.title}</p>
                                            {g.tips.map(tip => (
                                                <p key={tip} style={{ fontSize: 12, color: 'var(--p-text-sub)', padding: '3px 0', paddingLeft: 12 }}>• {tip}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ── App Settings Panel ── */}
                            {activePanel === 'settings' && m.key === 'settings' && (
                                <div style={{ padding: '16px 18px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--p-border)' }}>
                                    <div className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--p-border)' }}>
                                        <div>
                                            <p style={{ fontSize: 13, fontWeight: 600 }}>🌙 Dark Mode</p>
                                            <p className="text-muted" style={{ fontSize: 11 }}>Currently active</p>
                                        </div>
                                        <div onClick={() => setDarkMode(!darkMode)} style={{
                                            width: 44, height: 24, borderRadius: 12,
                                            background: darkMode ? 'var(--p-accent)' : 'rgba(255,255,255,0.2)',
                                            position: 'relative', cursor: 'pointer',
                                        }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 2, ...(darkMode ? { right: 2 } : { left: 2 }) }} />
                                        </div>
                                    </div>
                                    <div className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--p-border)' }}>
                                        <div>
                                            <p style={{ fontSize: 13, fontWeight: 600 }}>🔔 Push Notifications</p>
                                            <p className="text-muted" style={{ fontSize: 11 }}>SOS alerts & updates</p>
                                        </div>
                                        <div onClick={() => setNotifications(!notifications)} style={{
                                            width: 44, height: 24, borderRadius: 12,
                                            background: notifications ? 'var(--p-accent)' : 'rgba(255,255,255,0.2)',
                                            position: 'relative', cursor: 'pointer',
                                        }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 2, ...(notifications ? { right: 2 } : { left: 2 }) }} />
                                        </div>
                                    </div>
                                    <div className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--p-border)' }}>
                                        <div>
                                            <p style={{ fontSize: 13, fontWeight: 600 }}>📍 Location Services</p>
                                            <p className="text-muted" style={{ fontSize: 11 }}>For SOS geolocation</p>
                                        </div>
                                        <div style={{
                                            width: 44, height: 24, borderRadius: 12, background: 'var(--p-accent)',
                                            position: 'relative', cursor: 'pointer',
                                        }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 2, right: 2 }} />
                                        </div>
                                    </div>
                                    <div style={{ padding: '12px 0' }}>
                                        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>🌐 Language</p>
                                        <select style={{ ...inputStyle, padding: '8px 12px' }}>
                                            <option value="en">English</option>
                                            <option value="hi">हिंदी (Hindi)</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button className="btn btn-danger btn-block" style={{ marginTop: 8, padding: 14 }} onClick={onLogout}>Log Out</button>
                <p className="text-muted" style={{ fontSize: 11, textAlign: 'center', margin: '12px 0' }}>MedGuardian v1.2.0 · MedShield™</p>
            </div>
        </div>
    );
}
