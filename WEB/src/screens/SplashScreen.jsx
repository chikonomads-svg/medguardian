// Splash Screen
import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onDone }) {
    const [show, setShow] = useState(false);
    useEffect(() => { setShow(true); const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, []);
    return (
        <div style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(180deg,#060F1E,#0A1628,#0D1F3E)', height: '100%'
        }}>
            <div className={show ? 'scale-in' : ''} style={{ fontSize: 80, marginBottom: 16 }}>🛡️</div>
            <h1 className="fade-in" style={{ color: '#fff', fontSize: 32, fontWeight: 900, letterSpacing: 2 }}>MedGuardian</h1>
            <p className="fade-in" style={{ color: '#4A6FA5', fontSize: 13, marginTop: 8, letterSpacing: 3, fontWeight: 600 }}>
                YOUR SHIELD. YOUR RESPONSE.
            </p>
            <div className="fade-in" style={{
                marginTop: 40, width: 36, height: 4, borderRadius: 2, background: 'var(--p-accent)',
                animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%',
                backgroundImage: 'linear-gradient(90deg, var(--p-accent) 25%, var(--p-accent-lt) 50%, var(--p-accent) 75%)'
            }} />
        </div>
    );
}
