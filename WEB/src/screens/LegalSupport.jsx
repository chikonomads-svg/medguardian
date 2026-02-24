// Legal Support
import React, { useState } from 'react';
import { LAWYERS, INCIDENTS, FIR_TEMPLATE } from '../data/dummyData';

export default function LegalSupport({ onBack }) {
    const [tab, setTab] = useState('cases');
    const cases = INCIDENTS.filter(i => i.status === 'resolved').map(i => ({ ...i, caseStatus: 'settled' }));

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
            <div style={{ padding: '52px 20px 12px', borderBottom: '1px solid var(--p-border)' }}>
                <div className="flex-row" style={{ gap: 12 }}>
                    {onBack && <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--p-accent)', cursor: 'pointer', fontFamily: 'Inter' }}>←</button>}
                    <div><h2 style={{ fontSize: 22, fontWeight: 800 }}>⚖️ Legal Support</h2>
                        <p className="text-sub" style={{ fontSize: 12, marginTop: 2 }}>MedGuardian Legal Cell</p></div>
                </div>
            </div>

            <div className="tab-row">
                {['cases', 'lawyers', 'fir'].map(t => (
                    <button key={t} className={`tab-item ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                        {t === 'cases' ? 'My Cases' : t === 'lawyers' ? 'Lawyers' : 'FIR Template'}
                    </button>
                ))}
            </div>

            <div className="screen" style={{ padding: '16px 20px' }}>
                {tab === 'cases' && <>
                    <p className="text-sub" style={{ fontSize: 13, marginBottom: 14 }}>Your incident cases</p>
                    {cases.map(c => (
                        <div className="glass-card" key={c.id} style={{ marginBottom: 12 }}>
                            <div className="flex-between" style={{ marginBottom: 8 }}>
                                <span style={{ fontWeight: 700, fontSize: 14, flex: 1, marginRight: 8 }}>{c.location}</span>
                                <span className="badge settled">settled</span>
                            </div>
                            <p className="text-sub" style={{ fontSize: 13 }}>📅 {c.date}</p>
                            <p className="text-sub" style={{ fontSize: 13, marginTop: 3 }}>⚖️ {c.lawyer || 'N/A'}</p>
                        </div>
                    ))}
                </>}

                {tab === 'lawyers' && <>
                    <p className="text-sub" style={{ fontSize: 13, marginBottom: 14 }}>On-call lawyers — 24/7</p>
                    {LAWYERS.map(l => (
                        <div className="glass-card" key={l.id} style={{ marginBottom: 14 }}>
                            <div className="flex-row" style={{ marginBottom: 10, gap: 12 }}>
                                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'var(--p-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👩‍⚖️</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 700, fontSize: 15 }}>{l.name}</p>
                                    <p className="text-sub" style={{ fontSize: 12, marginTop: 2 }}>{l.specialty}</p>
                                </div>
                                <div style={{ width: 10, height: 10, borderRadius: 5, background: l.available ? 'var(--p-success)' : '#666' }} />
                            </div>
                            <p className="text-sub" style={{ fontSize: 13 }}>📍 {l.city} · {l.experience} yrs</p>
                            <p className="text-sub" style={{ fontSize: 13, marginTop: 3 }}>📋 Bar # {l.bar}</p>
                            <button className="btn btn-primary btn-block" style={{ marginTop: 12, padding: 10 }}>📞 Contact Now</button>
                        </div>
                    ))}
                </>}

                {tab === 'fir' && <>
                    <p className="text-sub" style={{ fontSize: 13, marginBottom: 14 }}>Pre-approved FIR template</p>
                    <div className="glass-card" style={{ background: 'var(--p-bg2)' }}>
                        <pre style={{ color: 'var(--p-text-sub)', fontSize: 12, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{FIR_TEMPLATE}</pre>
                    </div>
                    <button className="btn btn-outline btn-block" style={{ marginTop: 12 }}>📋 Copy Template</button>
                </>}
            </div>
        </div>
    );
}
