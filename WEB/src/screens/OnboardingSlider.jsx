// Onboarding Slider
import React, { useState } from 'react';

const SLIDES = [
    { icon: '🛡️', title: 'Instant Protection', desc: 'One tap triggers our Immediate Response Unit. Trained professionals reach you in minutes.' },
    { icon: '⚖️', title: 'Legal Shield', desc: 'On-call lawyers, pre-approved FIR templates, and full legal representation — activated automatically.' },
    { icon: '🤝', title: 'Doctor Community', desc: '5,200+ verified physicians. Share experiences, get support, and stand united.' },
];

export default function OnboardingSlider({ onDone }) {
    const [idx, setIdx] = useState(0);
    const slide = SLIDES[idx];
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#060F1E,#0A1628)', padding: '40px 24px 32px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="scale-in" key={idx} style={{ fontSize: 72, marginBottom: 24 }}>{slide.icon}</div>
                <h2 className="fade-in" key={`t${idx}`} style={{ color: '#fff', fontSize: 26, fontWeight: 800, textAlign: 'center', marginBottom: 12 }}>{slide.title}</h2>
                <p className="fade-in" key={`d${idx}`} style={{ color: 'var(--p-text-sub)', fontSize: 15, textAlign: 'center', lineHeight: 1.7, maxWidth: 320 }}>{slide.desc}</p>
            </div>
            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
                {SLIDES.map((_, i) => (
                    <div key={i} style={{
                        width: i === idx ? 24 : 8, height: 8, borderRadius: 4, transition: 'all 0.3s',
                        background: i === idx ? 'var(--p-accent)' : 'var(--p-border)'
                    }} />
                ))}
            </div>
            <button className="btn btn-primary btn-block" onClick={() => idx < 2 ? setIdx(idx + 1) : onDone()}
                style={{ padding: 16, fontSize: 16 }}>
                {idx < 2 ? 'Next →' : 'Get Started'}
            </button>
        </div>
    );
}
