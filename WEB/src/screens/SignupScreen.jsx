// Signup Screen — MedGuardian
import React, { useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function SignupScreen({ onDone, onSwitchToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSignup() {
        setError('');
        if (!name.trim() || !email.trim() || !phone.trim() || !password) {
            setError('All fields are required'); return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters'); return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), password }),
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('mg_user', JSON.stringify(data.user));
                onDone(data.user);
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch {
            setError('Unable to connect to server');
        }
        setLoading(false);
    }

    const inputStyle = {
        width: '100%', padding: '14px 16px', background: 'var(--p-bg2)', color: '#fff',
        fontSize: 15, border: '1px solid var(--p-border)', borderRadius: 12,
        outline: 'none', fontFamily: 'Inter', boxSizing: 'border-box', transition: 'border 0.2s',
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#060F1E,#0A1628)', padding: '40px 24px 32px', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
                <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>Create Account</h1>
                <p style={{ color: 'var(--p-text-sub)', fontSize: 14, marginTop: 8 }}>Sign up to activate your shield</p>
            </div>

            <div style={{ flex: 1, maxWidth: 400, width: '100%', margin: '0 auto' }}>
                {error && (
                    <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                        <p style={{ color: '#ef4444', fontSize: 13 }}>⚠️ {error}</p>
                    </div>
                )}

                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: 'var(--p-text-sub)', fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Full Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Dr. Your Name"
                        style={inputStyle} />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: 'var(--p-text-sub)', fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="doctor@hospital.com" type="email"
                        style={inputStyle} />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: 'var(--p-text-sub)', fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Phone Number</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <span style={{ ...inputStyle, width: 'auto', padding: '14px 12px', background: 'var(--p-card)', color: 'var(--p-text-sub)', fontWeight: 600, flexShrink: 0 }}>🇮🇳 +91</span>
                        <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="98765 43210" maxLength={10}
                            style={inputStyle} />
                    </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ color: 'var(--p-text-sub)', fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters"
                            type={showPassword ? 'text' : 'password'} style={inputStyle} />
                        <button onClick={() => setShowPassword(!showPassword)} style={{
                            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--p-text-sub)'
                        }}>{showPassword ? '🙈' : '👁️'}</button>
                    </div>
                </div>

                <button className="btn btn-primary btn-block" disabled={loading}
                    style={{ padding: 16, fontSize: 16, opacity: loading ? 0.6 : 1 }}
                    onClick={handleSignup}>
                    {loading ? '⏳ Creating Account...' : 'Sign Up →'}
                </button>

                <div style={{ textAlign: 'center', margin: '24px 0', color: 'var(--p-text-muted)', fontSize: 13 }}>— or —</div>

                <button className="btn btn-outline btn-block" style={{ padding: 14 }} onClick={() => onDone(null)}>
                    🔓 Demo Login (Skip Auth)
                </button>

                <p style={{ textAlign: 'center', color: 'var(--p-text-sub)', fontSize: 14, marginTop: 24 }}>
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', color: 'var(--p-accent)', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: 'Inter' }}>
                        Sign In
                    </button>
                </p>
            </div>

            <p style={{ color: 'var(--p-text-muted)', fontSize: 11, textAlign: 'center', marginTop: 16 }}>
                By signing up, you agree to MedGuardian's Terms of Service
            </p>
        </div>
    );
}
