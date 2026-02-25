// News Screen — Bihar/Muzaffarpur + India + World Medical News + Hindi Translate
import React, { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function NewsScreen() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState(0);
    const [translating, setTranslating] = useState({});
    const [translated, setTranslated] = useState({});

    useEffect(() => { fetchNews(); }, []);

    async function fetchNews() {
        setLoading(true);
        try {
            const res = await fetch(`${API}/news/feed`);
            const data = await res.json();
            setSections(data.sections || []);
            setError(data.error || null);
        } catch {
            setError('Failed to connect to news service');
            setSections([
                {
                    label: '🏥 Bihar & Muzaffarpur', results: [
                        { title: 'Bihar Doctor Safety: New Protocols Announced', url: '#', snippet: 'New safety measures introduced for healthcare workers across Bihar hospitals...', source: 'biharhealth.gov.in', published_date: '2026-02-24' },
                    ]
                },
                {
                    label: '🇮🇳 India Medical News', results: [
                        { title: 'IMA Demands Stricter Laws Against Doctor Violence', url: '#', snippet: 'Indian Medical Association demands nationwide enforcement of medical protection laws...', source: 'ndtv.com', published_date: '2026-02-23' },
                    ]
                },
                {
                    label: '🌍 World Health News', results: [
                        { title: 'WHO: Healthcare Worker Safety a Global Priority', url: '#', snippet: 'WHO highlights increasing global concern over violence against healthcare workers...', source: 'who.int', published_date: '2026-02-22' },
                    ]
                },
            ]);
        }
        setLoading(false);
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        try {
            const d = new Date(dateStr);
            if (isNaN(d)) return dateStr;
            return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch { return dateStr; }
    }

    function shortSummary(snippet) {
        if (!snippet) return '';
        const s = snippet.split(/[.!?]/)[0];
        return s.length > 100 ? s.slice(0, 97) + '...' : s + '.';
    }

    async function translateToHindi(key, text) {
        if (translated[key]) { setTranslated(prev => { const n = { ...prev }; delete n[key]; return n; }); return; }
        setTranslating(prev => ({ ...prev, [key]: true }));
        try {
            const res = await fetch(`${API}/legal/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: `Translate the following text to Hindi. Only return the Hindi translation, nothing else:\n\n${text}`, history: [] }),
            });
            const data = await res.json();
            setTranslated(prev => ({ ...prev, [key]: data.reply || 'Translation unavailable' }));
        } catch {
            setTranslated(prev => ({ ...prev, [key]: 'अनुवाद उपलब्ध नहीं है (Translation unavailable)' }));
        }
        setTranslating(prev => ({ ...prev, [key]: false }));
    }

    const SECTION_TABS = ['📋 All', ...sections.map(s => s.label)];
    const visibleSections = activeSection === 0
        ? sections
        : [sections[activeSection - 1]].filter(Boolean);

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
            <div style={{ padding: '52px 20px 12px', borderBottom: '1px solid var(--p-border)' }}>
                <div className="flex-between">
                    <div>
                        <h2 style={{ fontSize: 22, fontWeight: 800 }}>📰 Medical News</h2>
                        <p className="text-sub" style={{ fontSize: 12, marginTop: 2 }}>Bihar · India · World</p>
                    </div>
                    <button onClick={fetchNews} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: 13 }}>
                        🔄 Refresh
                    </button>
                </div>
            </div>

            <div className="screen" style={{ padding: '16px 20px' }}>
                {/* Section Tabs */}
                {!loading && sections.length > 0 && (
                    <div className="flex-row" style={{ gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                        {SECTION_TABS.map((tab, i) => (
                            <button key={tab} onClick={() => setActiveSection(i)} style={{
                                padding: '6px 14px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                                cursor: 'pointer', border: 'none', fontFamily: 'Inter', transition: 'all 0.2s',
                                background: activeSection === i ? 'var(--p-accent)' : 'rgba(37,99,235,0.12)',
                                color: activeSection === i ? '#fff' : 'var(--p-accent)',
                            }}>
                                {tab}
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="glass-card" style={{
                                marginBottom: 12, height: 90,
                                background: 'linear-gradient(90deg, var(--p-card) 25%, var(--p-border) 50%, var(--p-card) 75%)',
                                backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite'
                            }} />
                        ))}
                        <p className="text-sub" style={{ marginTop: 16 }}>Fetching news...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="glass-card" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', marginBottom: 16 }}>
                        <p style={{ color: 'var(--p-warning)', fontSize: 13 }}>⚠️ {error}</p>
                    </div>
                )}

                {!loading && visibleSections.map((section, si) => (
                    <div key={si} style={{ marginBottom: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 800, flex: 1 }}>{section.label}</h3>
                            <span className="text-muted" style={{ fontSize: 11 }}>{section.results?.length || 0} articles</span>
                        </div>

                        {section.results?.map((article, i) => {
                            const tKey = `${si}-${i}`;
                            return (
                                <div key={i} className="glass-card fade-in-up" style={{ marginBottom: 12 }}>
                                    {/* Summary + Date row */}
                                    <div className="flex-between" style={{ marginBottom: 6 }}>
                                        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--p-accent)', letterSpacing: 0.3, flex: 1 }}>
                                            {shortSummary(article.snippet)}
                                        </p>
                                        {(article.published_date || true) && (
                                            <span className="text-muted" style={{ fontSize: 10, flexShrink: 0, marginLeft: 8 }}>
                                                📅 {formatDate(article.published_date) || 'Recent'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <a href={article.url} target="_blank" rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="flex-between" style={{ marginBottom: 6, alignItems: 'flex-start', cursor: 'pointer' }}>
                                            <h4 style={{ fontSize: 14, fontWeight: 700, flex: 1, marginRight: 12, lineHeight: 1.4 }}>
                                                {article.title}
                                            </h4>
                                            <span style={{ fontSize: 16, flexShrink: 0, opacity: 0.5 }}>↗</span>
                                        </div>
                                    </a>

                                    {/* Snippet */}
                                    <p className="text-sub" style={{ fontSize: 12, lineHeight: 1.5, marginBottom: 8 }}>
                                        {article.snippet}
                                    </p>

                                    {/* Hindi Translation */}
                                    {translated[tKey] && (
                                        <div style={{
                                            padding: '10px 12px', borderRadius: 8, background: 'rgba(245,158,11,0.08)',
                                            border: '1px solid rgba(245,158,11,0.2)', marginBottom: 8, fontSize: 13, lineHeight: 1.6,
                                            color: 'var(--p-text-sub)'
                                        }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--p-warning)', display: 'block', marginBottom: 4 }}>
                                                🇮🇳 हिंदी अनुवाद
                                            </span>
                                            {translated[tKey]}
                                        </div>
                                    )}

                                    {/* Footer: Source + Translate */}
                                    <div className="flex-between">
                                        <span style={{
                                            padding: '3px 8px', borderRadius: 100, fontSize: 10, fontWeight: 700,
                                            background: 'rgba(16,185,129,0.12)', color: 'var(--p-success)'
                                        }}>
                                            🌐 {article.source}
                                        </span>
                                        <button onClick={() => translateToHindi(tKey, article.title + '. ' + article.snippet)}
                                            disabled={translating[tKey]}
                                            style={{
                                                padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700,
                                                cursor: 'pointer', border: '1px solid rgba(245,158,11,0.3)',
                                                background: translated[tKey] ? 'rgba(245,158,11,0.15)' : 'transparent',
                                                color: 'var(--p-warning)', fontFamily: 'Inter', transition: 'all 0.2s',
                                                opacity: translating[tKey] ? 0.5 : 1,
                                            }}>
                                            {translating[tKey] ? '⏳ Translating...' : translated[tKey] ? '🇮🇳 Hide Hindi' : '🇮🇳 हिंदी'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {(!section.results || section.results.length === 0) && (
                            <div className="glass-card" style={{ textAlign: 'center', padding: 24 }}>
                                <p className="text-sub" style={{ fontSize: 13 }}>No articles in this category</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
