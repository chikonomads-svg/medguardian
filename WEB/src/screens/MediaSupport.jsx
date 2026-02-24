// Media Support
import React, { useState } from 'react';
import { MEDIA_STATEMENTS } from '../data/dummyData';

const SENTIMENT = [
    { platform: 'Twitter / X', icon: '🐦', sentiment: 'neutral', mentions: 24, summary: 'Doctor safety trending mildly. Mixed reactions.' },
    { platform: 'Facebook', icon: '📘', sentiment: 'positive', mentions: 67, summary: 'Support posts for healthcare workers gaining traction.' },
    { platform: 'News Media', icon: '📰', sentiment: 'negative', mentions: 3, summary: '3 articles on hospital violence published today.' },
];
const COLORS = { positive: 'var(--p-success)', neutral: 'var(--p-warning)', negative: 'var(--w-accent)' };

export default function MediaSupport() {
    const [tab, setTab] = useState('statements');
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
            <div style={{ padding: '52px 20px 12px', borderBottom: '1px solid var(--p-border)' }}>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>📢 Media Wing</h2>
                <p className="text-sub" style={{ fontSize: 12, marginTop: 2 }}>Narrative & Reputation Management</p>
            </div>
            <div className="tab-row">
                <button className={`tab-item ${tab === 'statements' ? 'active' : ''}`} onClick={() => setTab('statements')}>Press Statements</button>
                <button className={`tab-item ${tab === 'monitoring' ? 'active' : ''}`} onClick={() => setTab('monitoring')}>Social Monitoring</button>
            </div>
            <div className="screen" style={{ padding: '16px 20px' }}>
                {tab === 'statements' && <>
                    <p className="text-sub" style={{ fontSize: 13, marginBottom: 14 }}>Official statements by the Media Cell</p>
                    {MEDIA_STATEMENTS.map(s => (
                        <div className="glass-card" key={s.id} style={{ marginBottom: 14 }}>
                            <div className="flex-between" style={{ marginBottom: 6, alignItems: 'flex-start' }}>
                                <span style={{ fontWeight: 700, fontSize: 14, flex: 1, marginRight: 8 }}>{s.title}</span>
                                <span className={`badge ${s.status}`}>{s.status}</span>
                            </div>
                            <p className="text-muted" style={{ fontSize: 12, marginBottom: 8 }}>{s.date}</p>
                            <p className="text-sub" style={{ fontSize: 13, lineHeight: 1.6 }}>{s.content}</p>
                        </div>
                    ))}
                    <div className="glass-card" style={{ textAlign: 'center', padding: 24 }}>
                        <span style={{ fontSize: 32 }}>✍️</span>
                        <p style={{ fontWeight: 700, fontSize: 16, marginTop: 8 }}>Draft a New Statement</p>
                        <p className="text-sub" style={{ fontSize: 12, margin: '4px 0 16px' }}>Media Cell reviews within 2 hours</p>
                        <button className="btn btn-primary">+ Create Draft</button>
                    </div>
                </>}
                {tab === 'monitoring' && <>
                    <p className="text-sub" style={{ fontSize: 13, marginBottom: 14 }}>Real-time social media sentiment</p>
                    {SENTIMENT.map(s => (
                        <div className="glass-card" key={s.platform} style={{ marginBottom: 12 }}>
                            <div className="flex-row" style={{ marginBottom: 8, gap: 12 }}>
                                <span style={{ fontSize: 26 }}>{s.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 700, fontSize: 14 }}>{s.platform}</p>
                                    <p className="text-sub" style={{ fontSize: 12 }}>{s.mentions} mentions today</p>
                                </div>
                                <div style={{ width: 8, height: 8, borderRadius: 4, background: COLORS[s.sentiment], marginRight: 6 }} />
                                <span style={{ fontWeight: 700, fontSize: 12, color: COLORS[s.sentiment], textTransform: 'capitalize' }}>{s.sentiment}</span>
                            </div>
                            <p className="text-sub" style={{ fontSize: 13, lineHeight: 1.5 }}>{s.summary}</p>
                        </div>
                    ))}
                    <div className="glass-card" style={{ marginTop: 4 }}>
                        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>🚨 Report Fake News</p>
                        <p className="text-sub" style={{ fontSize: 13, marginBottom: 14 }}>Flag misinformation for our media team</p>
                        <button className="btn btn-danger btn-block">Submit Report</button>
                    </div>
                </>}
            </div>
        </div>
    );
}
