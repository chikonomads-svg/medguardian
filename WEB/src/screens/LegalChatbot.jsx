// Legal AI Chatbot — Azure OpenAI (Indian Law / Bihar Jurisdiction)
import React, { useState, useRef, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const SUGGESTIONS = [
    'What are my rights if a patient attacks me in Bihar?',
    'How to file an FIR for violence against a doctor?',
    'What is the Medical Protection Act?',
    'Can a doctor refuse to treat a violent patient?',
];

export default function LegalChatbot() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '🛡️ **Namaste, Doctor!**\n\nI am your AI Legal Assistant specialized in **Indian law with Bihar jurisdiction** focus.\n\nAsk me anything about:\n• Medical protection laws\n• FIR filing procedures\n• Rights against violence\n• Legal notices & templates\n• Consumer forum procedures in Bihar\n\n*How can I help you today?*' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

    async function sendMessage(text) {
        const msg = text || input.trim();
        if (!msg || loading) return;
        setInput('');

        const userMsg = { role: 'user', content: msg };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            const history = messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content }));
            const res = await fetch(`${API}/legal/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg, history }),
            });
            const data = await res.json();

            if (data.error) {
                setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${data.error}\n\nPlease try again or rephrase your question.` }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            }
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Unable to connect to the legal AI service. Please ensure the backend is running and try again.' }]);
        }
        setLoading(false);
    }

    function formatMessage(text) {
        // Simple markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^• /gm, '&bull; ')
            .replace(/^#{1,3} (.*?)$/gm, '<strong style="font-size:15px;display:block;margin:10px 0 4px">$1</strong>')
            .replace(/\n/g, '<br/>');
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--p-bg)' }}>
            {/* Header */}
            <div style={{ padding: '52px 20px 12px', borderBottom: '1px solid var(--p-border)', flexShrink: 0 }}>
                <div className="flex-row" style={{ gap: 12 }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: 20, background: 'rgba(37,99,235,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
                    }}>⚖️</div>
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 800 }}>Legal AI Assistant</h2>
                        <p className="text-sub" style={{ fontSize: 11 }}>Indian Law · Bihar Jurisdiction · 24/7</p>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--p-success)' }} />
                        <span className="text-sub" style={{ fontSize: 11, fontWeight: 600 }}>Online</span>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="screen" style={{ padding: '16px 16px 8px', flex: 1 }}>
                {messages.map((msg, i) => (
                    <div key={i} className="fade-in" style={{
                        display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        marginBottom: 14,
                    }}>
                        <div style={{
                            maxWidth: '85%', padding: '14px 16px', borderRadius: 16,
                            background: msg.role === 'user' ? 'var(--p-accent)' : 'var(--p-card)',
                            border: msg.role === 'user' ? 'none' : '1px solid var(--p-border)',
                            borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                            borderBottomLeftRadius: msg.role === 'user' ? 16 : 4,
                        }}>
                            {msg.role === 'assistant' && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                    <span style={{ fontSize: 14 }}>⚖️</span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--p-accent)' }}>Legal AI</span>
                                </div>
                            )}
                            <div style={{
                                fontSize: 14, lineHeight: 1.7, color: msg.role === 'user' ? '#fff' : 'var(--p-text-sub)',
                                wordBreak: 'break-word'
                            }}
                                dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                        </div>
                    </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                    <div className="fade-in" style={{ display: 'flex', marginBottom: 14 }}>
                        <div style={{
                            padding: '14px 20px', borderRadius: 16, background: 'var(--p-card)',
                            border: '1px solid var(--p-border)', borderBottomLeftRadius: 4
                        }}>
                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                <span style={{ fontSize: 14 }}>⚖️</span>
                                <div style={{ display: 'flex', gap: 4 }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{
                                            width: 8, height: 8, borderRadius: 4, background: 'var(--p-accent)',
                                            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
                                        }} />
                                    ))}
                                </div>
                                <span className="text-muted" style={{ fontSize: 12, marginLeft: 4 }}>Analyzing laws...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Suggestions (show only at start) */}
            {messages.length <= 1 && (
                <div style={{ padding: '0 16px 8px', display: 'flex', gap: 8, flexWrap: 'wrap', flexShrink: 0 }}>
                    {SUGGESTIONS.map((s, i) => (
                        <button key={i} onClick={() => sendMessage(s)} style={{
                            padding: '8px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                            background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.3)',
                            color: 'var(--p-accent)', cursor: 'pointer', fontFamily: 'Inter',
                        }}>{s}</button>
                    ))}
                </div>
            )}

            {/* Input Bar */}
            <div style={{
                padding: '12px 16px env(safe-area-inset-bottom, 12px)', borderTop: '1px solid var(--p-border)',
                background: 'var(--p-bg2)', flexShrink: 0
            }}>
                <div style={{ display: 'flex', gap: 10 }}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask a legal question..."
                        disabled={loading}
                        style={{
                            flex: 1, padding: '14px 18px', borderRadius: 14, border: '1px solid var(--p-border)',
                            background: 'var(--p-bg)', color: '#fff', fontSize: 15, outline: 'none',
                            fontFamily: 'Inter', opacity: loading ? 0.5 : 1,
                        }}
                    />
                    <button
                        onClick={() => sendMessage()}
                        disabled={loading || !input.trim()}
                        style={{
                            width: 48, height: 48, borderRadius: 14, border: 'none',
                            background: input.trim() ? 'var(--p-accent)' : 'var(--p-card)',
                            color: '#fff', fontSize: 20, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                        }}
                    >➤</button>
                </div>
            </div>
        </div>
    );
}
