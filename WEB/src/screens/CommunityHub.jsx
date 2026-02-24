// Community Hub
import React, { useState } from 'react';
import { POSTS } from '../data/dummyData';

const TYPES = { incident_share: '🚨', support: '🤝', advice: '💡', question: '❓' };
const FILTERS = ['All', 'Incident', 'Support', 'Advice', 'Question'];
const MAP = { Incident: 'incident_share', Support: 'support', Advice: 'advice', Question: 'question' };

export default function CommunityHub() {
    const [posts, setPosts] = useState(POSTS);
    const [filter, setFilter] = useState('All');

    const filtered = filter === 'All' ? posts : posts.filter(p => p.type === MAP[filter]);

    function upvote(id) { setPosts(ps => ps.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p)); }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
            <div style={{ padding: '52px 20px 12px', borderBottom: '1px solid var(--p-border)' }}>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>🤝 Doctor Community</h2>
                <p className="text-sub" style={{ fontSize: 12, marginTop: 2 }}>5,200+ verified physicians · Safe space</p>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 8, padding: '12px 16px', flexWrap: 'wrap' }}>
                {FILTERS.map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                        padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter',
                        border: `1px solid ${filter === f ? 'var(--p-accent)' : 'var(--p-border)'}`,
                        background: filter === f ? 'rgba(37,99,235,0.18)' : 'var(--p-card)',
                        color: filter === f ? 'var(--p-accent)' : 'var(--p-text-muted)',
                    }}>{f}</button>
                ))}
            </div>

            <div className="screen" style={{ padding: '8px 16px' }}>
                {filtered.map(p => (
                    <div className="glass-card fade-in" key={p.id} style={{ marginBottom: 14 }}>
                        {/* Author */}
                        <div className="flex-row" style={{ marginBottom: 10, gap: 10 }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 20, background: 'var(--p-border)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontSize: 20
                            }}>
                                {p.anonymous ? '🎭' : '👨‍⚕️'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 700, fontSize: 14 }}>{p.author}</p>
                                <p className="text-muted" style={{ fontSize: 11 }}>{p.specialty} · {p.time}</p>
                            </div>
                            <span style={{ fontSize: 22 }}>{TYPES[p.type]}</span>
                        </div>
                        <p className="text-sub" style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{p.content}</p>
                        {/* Footer */}
                        <div className="flex-row" style={{ gap: 16 }}>
                            <button onClick={() => upvote(p.id)} style={{
                                padding: '6px 14px', borderRadius: 100, border: '1px solid var(--p-border)', background: 'rgba(37,99,235,0.15)',
                                color: 'var(--p-accent)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter',
                            }}>▲ {p.upvotes}</button>
                            <span className="text-sub" style={{ fontSize: 13 }}>💬 {p.comments}</span>
                            {p.anonymous && (
                                <span style={{
                                    marginLeft: 'auto', padding: '4px 10px', borderRadius: 100, background: 'rgba(100,100,100,0.25)',
                                    fontSize: 11, fontWeight: 600, color: 'var(--p-text-muted)'
                                }}>Anonymous</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
