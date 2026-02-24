// SOS Activation (3-2-1 Countdown)
import React, { useEffect, useState } from 'react';

export default function SOSActivation({ onComplete, onCancel }) {
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count === 0) { setTimeout(onComplete, 500); return; }
        const t = setTimeout(() => setCount(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [count]);

    const bg = count === 0 ? 'var(--w-accent)' : '#0D0D0D';

    return (
        <div style={{
            height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: bg, transition: 'background 0.4s', padding: 32
        }}>

            <p style={{ color: 'var(--w-accent-lt)', fontSize: 16, fontWeight: 800, letterSpacing: 3, marginBottom: 32 }}>
                ⚠️  SOS ACTIVATING
            </p>

            <div key={count} style={{
                color: '#fff', fontSize: 120, fontWeight: 900, lineHeight: 1,
                animation: 'countPulse 0.4s ease-out'
            }}>
                {count === 0 ? '🚨' : count}
            </div>

            <p style={{ color: 'var(--w-text-sub)', fontSize: 15, marginTop: 20, letterSpacing: 1, textAlign: 'center' }}>
                {count > 0 ? 'Dispatching IRU Unit…' : 'Alert Sent! IRU Dispatched.'}
            </p>

            <div style={{
                marginTop: 36, width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 14,
                border: '1px solid rgba(255,23,68,0.3)', padding: 18
            }}>
                <p style={{ color: '#fff', fontSize: 14, marginBottom: 6 }}>📍 Location: AIIMS New Delhi</p>
                <p style={{ color: '#fff', fontSize: 14, marginBottom: 6 }}>📞 IRU Unit: MG-21 — Rajesh Patil</p>
                <p style={{ color: '#fff', fontSize: 14 }}>⚖️  Lawyer: Adv. Priya Sharma</p>
            </div>

            {count > 0 && (
                <button onClick={onCancel} style={{
                    marginTop: 48, padding: '14px 36px', borderRadius: 100, border: '2px solid var(--w-accent-lt)',
                    background: 'transparent', color: 'var(--w-accent-lt)', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'Inter'
                }}>
                    ✕  Cancel SOS
                </button>
            )}
        </div>
    );
}
