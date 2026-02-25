// Community Hub — Simplified: Post concerns + feed
import React, { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function CommunityHub() {
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [posting, setPosting] = useState(false);

    useEffect(() => { fetchPosts(); }, []);

    async function fetchPosts() {
        try {
            const res = await fetch(`${API}/community/posts`);
            const data = await res.json();
            setPosts(data.posts || []);
        } catch {
            // Fallback
            setPosts([
                { id: 'p1', author: 'Dr. Sneha Kapoor', content: 'Faced mob violence in ER last night. IRU reached in 8 minutes. Grateful for MedGuardian.', time: '2h ago', anonymous: false },
                { id: 'p2', author: 'Anonymous Doctor', content: 'To fellow doctors going through tough times — you are not alone.', time: '5h ago', anonymous: true },
            ]);
        }
    }

    async function submitConcern() {
        if (!content.trim()) return;
        setPosting(true);
        try {
            await fetch(`${API}/community/posts/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author: author.trim() || 'Anonymous Doctor', content: content.trim() }),
            });
            setContent('');
            setAuthor('');
            setShowForm(false);
            fetchPosts();
        } catch {
            // Add locally if backend fails
            setPosts(prev => [{ id: Date.now(), author: author || 'Anonymous Doctor', content, time: 'Just now', anonymous: !author }, ...prev]);
            setContent('');
            setAuthor('');
            setShowForm(false);
        }
        setPosting(false);
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
            <div style={{ padding: '52px 20px 12px', borderBottom: '1px solid var(--p-border)' }}>
                <div className="flex-between">
                    <div>
                        <h2 style={{ fontSize: 22, fontWeight: 800 }}>🤝 Doctor Community</h2>
                        <p className="text-sub" style={{ fontSize: 12, marginTop: 2 }}>Share your concerns · Safe space</p>
                    </div>
                    <button onClick={() => setShowForm(!showForm)} className="btn btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>
                        {showForm ? '✕ Close' : '+ Post Concern'}
                    </button>
                </div>
            </div>

            <div className="screen" style={{ padding: '16px 20px' }}>
                {/* Post Form */}
                {showForm && (
                    <div className="glass-card fade-in" style={{ marginBottom: 20, border: '1px solid rgba(37,99,235,0.3)' }}>
                        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>📝 Post Your Concern</p>

                        <label className="text-sub" style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Name (optional)</label>
                        <input
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            placeholder="Leave empty for Anonymous"
                            style={{
                                width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--p-border)',
                                background: 'var(--p-bg)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'Inter', marginBottom: 12
                            }}
                        />

                        <label className="text-sub" style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Concern</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Share your concern with the community..."
                            rows={4}
                            style={{
                                width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--p-border)',
                                background: 'var(--p-bg)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'Inter', resize: 'vertical',
                                lineHeight: 1.6, marginBottom: 14
                            }}
                        />

                        <button onClick={submitConcern} disabled={posting || !content.trim()}
                            className="btn btn-primary btn-block" style={{ padding: 14, opacity: content.trim() ? 1 : 0.5 }}>
                            {posting ? 'Posting...' : '✓ Submit Concern'}
                        </button>
                    </div>
                )}

                {/* Feed */}
                {posts.map(p => (
                    <div className="glass-card fade-in" key={p.id} style={{ marginBottom: 14 }}>
                        <div className="flex-row" style={{ marginBottom: 10, gap: 10 }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 20, background: 'var(--p-border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                            }}>
                                {p.anonymous ? '🎭' : '👨‍⚕️'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 700, fontSize: 14 }}>{p.author}</p>
                                <p className="text-muted" style={{ fontSize: 11 }}>{p.time || 'Just now'}</p>
                            </div>
                            {p.anonymous && (
                                <span style={{
                                    padding: '4px 10px', borderRadius: 100, background: 'rgba(100,100,100,0.25)',
                                    fontSize: 10, fontWeight: 600, color: 'var(--p-text-muted)'
                                }}>Anonymous</span>
                            )}
                        </div>
                        <p className="text-sub" style={{ fontSize: 14, lineHeight: 1.7 }}>{p.content}</p>
                    </div>
                ))}

                {posts.length === 0 && (
                    <div className="glass-card" style={{ textAlign: 'center', padding: 40 }}>
                        <span style={{ fontSize: 48 }}>🤝</span>
                        <p style={{ fontWeight: 700, fontSize: 16, marginTop: 12 }}>No concerns posted yet</p>
                        <p className="text-sub" style={{ fontSize: 13, marginTop: 4 }}>Be the first to share</p>
                    </div>
                )}
            </div>
        </div>
    );
}
