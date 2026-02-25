// MedGuardian — App Root (Responsive Web + Mobile) v1.1
import React, { useState } from 'react';
import { SOSProvider, useSOS } from './context/SOSContext';
import SplashScreen from './screens/SplashScreen';
import OnboardingSlider from './screens/OnboardingSlider';
import LoginScreen from './screens/LoginScreen';
import MainDashboard from './screens/MainDashboard';
import SOSActivation from './screens/SOSActivation';
import EmergencyActive from './screens/EmergencyActive';
import LegalChatbot from './screens/LegalChatbot';
import LegalSupport from './screens/LegalSupport';
import NewsScreen from './screens/NewsScreen';
import CommunityHub from './screens/CommunityHub';
import ProfileScreen from './screens/ProfileScreen';

const TABS = [
    { key: 'dashboard', icon: '🛡️', label: 'Shield' },
    { key: 'legalchat', icon: '⚖️', label: 'Legal AI' },
    { key: 'legal', icon: '📋', label: 'Legal' },
    { key: 'news', icon: '📰', label: 'News' },
    { key: 'community', icon: '🤝', label: 'Community' },
    { key: 'profile', icon: '👤', label: 'Profile' },
];

function AppInner() {
    const [screen, setScreen] = useState('splash');
    const [tab, setTab] = useState('dashboard');
    const { triggerSOS, cancelSOS, resetSOS } = useSOS();

    function handleSOS() { triggerSOS(); setScreen('countdown'); }
    function handleCountdownDone() { setScreen('emergency'); }
    function handleCancelSOS() { cancelSOS(); setScreen('main'); setTab('dashboard'); }
    function handleResolved() { resetSOS(); setScreen('main'); setTab('dashboard'); }
    function handleLogout() { setScreen('login'); }

    // Full-screen overlay screens (before login or during SOS)
    if (screen === 'splash') return (
        <div className="app-wrapper">
            <div className="app-shell"><SplashScreen onDone={() => setScreen('onboarding')} /></div>
        </div>
    );
    if (screen === 'onboarding') return (
        <div className="app-wrapper">
            <div className="app-shell"><OnboardingSlider onDone={() => setScreen('login')} /></div>
        </div>
    );
    if (screen === 'login') return (
        <div className="app-wrapper">
            <div className="app-shell"><LoginScreen onDone={() => setScreen('main')} /></div>
        </div>
    );
    if (screen === 'countdown') return (
        <div className="app-wrapper">
            <div className="app-shell"><SOSActivation onComplete={handleCountdownDone} onCancel={handleCancelSOS} /></div>
        </div>
    );
    if (screen === 'emergency') return (
        <div className="app-wrapper">
            <div className="app-shell">
                <EmergencyActive
                    onViewIRU={() => setScreen('legal-emergency')}
                    onViewLegal={() => setScreen('legal-emergency')}
                    onCancel={handleCancelSOS}
                    onResolved={handleResolved}
                />
            </div>
        </div>
    );
    if (screen === 'legal-emergency') return (
        <div className="app-wrapper">
            <div className="app-shell"><LegalSupport onBack={() => setScreen('emergency')} /></div>
        </div>
    );

    // Main app with responsive navigation
    return (
        <div className="app-wrapper">
            {/* ── Desktop Sidebar (hidden on mobile via CSS) ── */}
            <aside className="desktop-sidebar">
                <div className="sidebar-logo">
                    <div>
                        <span className="logo-icon">🛡️</span>
                    </div>
                    <div>
                        <div className="logo-text">MedGuardian</div>
                        <div className="logo-sub">PHYSICIAN SAFETY</div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            className={`sidebar-item ${tab === t.key ? 'active' : ''}`}
                            onClick={() => setTab(t.key)}
                        >
                            <span className="si-icon">{t.icon}</span>
                            <span className="si-label">{t.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <p>MedGuardian v1.1</p>
                    <p style={{ marginTop: 4 }}>MedShield™ Active</p>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="app-shell">
                <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {tab === 'dashboard' && <MainDashboard onSOS={handleSOS} />}
                    {tab === 'legalchat' && <LegalChatbot />}
                    {tab === 'legal' && <LegalSupport />}
                    {tab === 'news' && <NewsScreen />}
                    {tab === 'community' && <CommunityHub />}
                    {tab === 'profile' && <ProfileScreen onLogout={handleLogout} />}
                </div>

                {/* ── Mobile Bottom Nav (hidden on desktop via CSS) ── */}
                <nav className="bottom-nav">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            className={`nav-item ${tab === t.key ? 'active' : ''}`}
                            onClick={() => setTab(t.key)}
                        >
                            <span className="nav-icon">{t.icon}</span>
                            <span className="nav-label">{t.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <SOSProvider>
            <AppInner />
        </SOSProvider>
    );
}
