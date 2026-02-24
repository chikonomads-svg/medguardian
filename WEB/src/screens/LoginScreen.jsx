// Login Screen
import React, { useState } from 'react';

export default function LoginScreen({ onDone }) {
    const [phone, setPhone] = useState('');
    const [shake, setShake] = useState(false);

    function handleLogin() {
        if (phone.length < 10) {
            setShake(true); setTimeout(() => setShake(false), 500);
        } else onDone();
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#060F1E,#0A1628)', padding: '60px 24px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
                <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>Welcome to MedGuardian</h1>
                <p style={{ color: 'var(--p-text-sub)', fontSize: 14, marginTop: 8 }}>Sign in to activate your shield</p>
            </div>

            <div style={{ flex: 1 }}>
                <label style={{ color: 'var(--p-text-sub)', fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Phone Number</label>
                <div className={shake ? 'shake' : ''} style={{
                    display: 'flex', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--p-border)',
                    animation: shake ? 'shake 0.4s ease' : 'none'
                }}>
                    <span style={{ background: 'var(--p-card)', padding: '14px 12px', color: 'var(--p-text-sub)', fontSize: 15, fontWeight: 600 }}>🇮🇳 +91</span>
                    <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210" maxLength={10}
                        style={{ flex: 1, padding: '14px 16px', background: 'var(--p-bg2)', color: '#fff', fontSize: 16, border: 'none', outline: 'none', fontFamily: 'Inter' }} />
                </div>

                <button className="btn btn-primary btn-block" style={{ marginTop: 20, padding: 16, fontSize: 16 }} onClick={handleLogin}>
                    Continue →
                </button>

                <div style={{ textAlign: 'center', margin: '28px 0', color: 'var(--p-text-muted)', fontSize: 13 }}>— or —</div>

                <button className="btn btn-outline btn-block" style={{ padding: 14 }} onClick={onDone}>
                    🔓 Demo Login (Skip Auth)
                </button>
            </div>

            <p style={{ color: 'var(--p-text-muted)', fontSize: 11, textAlign: 'center' }}>
                By continuing, you agree to MedGuardian's Terms of Service
            </p>

            <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`}</style>
        </div>
    );
}
