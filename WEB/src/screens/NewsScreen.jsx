// News Screen — Bihar / Muzaffarpur Medical News (Tavily)
import React, { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function NewsScreen() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { fetchNews(); }, []);

    async function fetchNews() {
        setLoading(true);
        try {
            const res = await fetch(`${API}/news/feed`);
            const data = await res.json();
            setArticles(data.results || []);
            setError(data.error || null);
        } catch (e) {
            setError('Failed to connect to news service');
            // Fallback
            setArticles([
                { title: 'Bihar Health Department Announces New Safety Protocol for Doctors', url: '#', snippet: 'The Bihar Health Department has introduced new safety measures for healthcare workers across all government hospitals...', source: 'biharhealth.gov.in' },
                { title: 'Muzaffarpur Medical College Upgrades Emergency Response', url: '#', snippet: 'SKMCH Muzaffarpur has implemented a rapid response system for doctor safety following recent incidents...', source: 'timesofindia.com' },
                { title: 'IMA Bihar Chapter Demands Stricter Laws Against Violence on Doctors', url: '#', snippet: 'The Indian Medical Association Bihar chapter has demanded stricter enforcement of the Medical Protection Act...', source: 'ndtv.com' },
            ]);
        }
        setLoading(false);
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
            <div style={{ padding: '52px 20px 12px', borderBottom: '1px solid var(--p-border)' }}>
                <div className="flex-between">
                    <div>
                        <h2 style={{ fontSize: 22, fontWeight: 800 }}>📰 Medical News</h2>
                        <p className="text-sub" style={{ fontSize: 12, marginTop: 2 }}>Bihar & Muzaffarpur Healthcare Updates</p>
                    </div>
                    <button onClick={fetchNews} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: 13 }}>
                        🔄 Refresh
                    </button>
                </div>
            </div>

            <div className="screen" style={{ padding: '16px 20px' }}>
                {/* Region Tags */}
                <div className="flex-row" style={{ gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                    {['Bihar', 'Muzaffarpur', 'Healthcare', 'Medical Safety'].map(tag => (
                        <span key={tag} style={{
                            padding: '5px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                            background: 'rgba(37,99,235,0.12)', color: 'var(--p-accent)', border: '1px solid rgba(37,99,235,0.3)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {loading && (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass-card" style={{
                                marginBottom: 12, height: 100,
                                background: 'linear-gradient(90deg, var(--p-card) 25%, var(--p-border) 50%, var(--p-card) 75%)',
                                backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite'
                            }} />
                        ))}
                        <p className="text-sub" style={{ marginTop: 16 }}>Fetching latest news from Bihar...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="glass-card" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', marginBottom: 16 }}>
                        <p style={{ color: 'var(--p-warning)', fontSize: 13 }}>⚠️ {error}</p>
                    </div>
                )}

                {!loading && articles.map((article, i) => (
                    <a key={i} href={article.url} target="_blank" rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                        <div className="glass-card fade-in-up" style={{ marginBottom: 14, cursor: 'pointer' }}>
                            <div className="flex-between" style={{ marginBottom: 8, alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: 15, fontWeight: 700, flex: 1, marginRight: 12, lineHeight: 1.4 }}>
                                    {article.title}
                                </h3>
                                <span style={{ fontSize: 18, flexShrink: 0 }}>↗</span>
                            </div>
                            <p className="text-sub" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>
                                {article.snippet}
                            </p>
                            <div className="flex-row" style={{ gap: 8 }}>
                                <span style={{
                                    padding: '3px 8px', borderRadius: 100, fontSize: 10, fontWeight: 700,
                                    background: 'rgba(16,185,129,0.12)', color: 'var(--p-success)'
                                }}>
                                    🌐 {article.source}
                                </span>
                            </div>
                        </div>
                    </a>
                ))}

                {!loading && articles.length === 0 && (
                    <div className="glass-card" style={{ textAlign: 'center', padding: 40 }}>
                        <span style={{ fontSize: 48 }}>📰</span>
                        <p style={{ fontWeight: 700, fontSize: 16, marginTop: 12 }}>No news available</p>
                        <p className="text-sub" style={{ fontSize: 13, marginTop: 4 }}>Try refreshing in a moment</p>
                    </div>
                )}
            </div>
        </div>
    );
}
