// MedGuardian — Emergency Active Screen (War Mode)
// Black + red UI, live status updates via SOSContext
import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Animated, StatusBar,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { useSOS } from '../../context/SOSContext';

const STATE_STEPS = [
    { key: 'dispatched', label: 'IRU Unit Assigned', icon: '🚨' },
    { key: 'en_route', label: 'Unit En Route to You', icon: '🚗' },
    { key: 'on_scene', label: 'IRU On Scene', icon: '🛡️' },
    { key: 'lawyer_connected', label: 'Lawyer Connected', icon: '⚖️' },
    { key: 'resolved', label: 'Incident Resolved', icon: '✅' },
];

function StepRow({ step, currentState, index }) {
    const states = STATE_STEPS.map(s => s.key);
    const currentIdx = states.indexOf(currentState);
    const done = index <= currentIdx;
    const active = index === currentIdx;

    const glow = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (active) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glow, { toValue: 1, duration: 700, useNativeDriver: true }),
                    Animated.timing(glow, { toValue: 0.3, duration: 700, useNativeDriver: true }),
                ])
            ).start();
        } else {
            glow.setValue(done ? 1 : 0);
        }
    }, [active, done]);

    return (
        <View style={styles.stepRow}>
            <Animated.View style={[
                styles.stepCircle,
                done && styles.stepDone,
                active && { borderColor: Colors.war.accent, opacity: glow },
            ]}>
                <Text style={styles.stepIcon}>{step.icon}</Text>
            </Animated.View>
            <Text style={[styles.stepLabel, done && styles.stepLabelDone]}>
                {step.label}
            </Text>
            {done && <Text style={styles.checkmark}>✓</Text>}
        </View>
    );
}

export default function EmergencyActive({ navigation }) {
    const { incident, cancelSOS, resetSOS, phase } = useSOS();
    const [elapsed, setElapsed] = useState(0);
    const pulseRed = useRef(new Animated.Value(1)).current;

    // Pulse the red background strip
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseRed, { toValue: 1.015, duration: 800, useNativeDriver: true }),
                Animated.timing(pulseRed, { toValue: 1, duration: 800, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    // Elapsed timer
    useEffect(() => {
        const t = setInterval(() => setElapsed(e => e + 1), 1000);
        return () => clearInterval(t);
    }, []);

    // Auto navigate to resolved screen
    useEffect(() => {
        if (phase === 'resolved') {
            setTimeout(() => navigation.replace('Main'), 3000);
        }
    }, [phase]);

    const state = incident?.state ?? 'dispatched';
    const eta = incident?.eta_minutes ?? 12;
    const unit = incident?.assigned_unit_code ?? 'MG-21';
    const lead = incident?.team_lead ?? 'Rajesh Patil';
    const lawyer = incident?.lawyer_name ?? null;

    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

            {/* Top Red Banner */}
            <Animated.View style={[styles.topBanner, { transform: [{ scale: pulseRed }] }]}>
                <Text style={styles.sosLabel}>🚨  SOS ACTIVE</Text>
                <Text style={styles.elapsed}>{mins}:{secs}</Text>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* ETA Card */}
                <View style={styles.etaCard}>
                    <Text style={styles.etaLabel}>IRU Unit {unit}</Text>
                    <Text style={styles.etaValue}>
                        {state === 'on_scene' || state === 'lawyer_connected' || state === 'resolved'
                            ? '🟢 ON SCENE'
                            : `${eta} MIN ETA`}
                    </Text>
                    <Text style={styles.etaLead}>Lead: {lead}</Text>
                </View>

                {/* Progress Steps */}
                <Text style={styles.sectionTitle}>RESPONSE TIMELINE</Text>
                <View style={styles.stepsContainer}>
                    {STATE_STEPS.map((step, i) => (
                        <StepRow key={step.key} step={step} currentState={state} index={i} />
                    ))}
                </View>

                {/* Lawyer Card */}
                {lawyer && (
                    <View style={styles.lawyerCard}>
                        <Text style={styles.lawyerIcon}>⚖️</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.lawyerName}>{lawyer}</Text>
                            <Text style={styles.lawyerSub}>Legal representation secured</Text>
                        </View>
                        <Text style={styles.liveTag}>LIVE</Text>
                    </View>
                )}

                {/* Resolved Banner */}
                {phase === 'resolved' && (
                    <View style={styles.resolvedBanner}>
                        <Text style={styles.resolvedText}>✅  Incident Resolved. Returning to dashboard…</Text>
                    </View>
                )}

                {/* Actions */}
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.trackBtn}
                        onPress={() => navigation.navigate('IRUTracking')}
                    >
                        <Text style={styles.trackBtnText}>📍 Track IRU Live</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.legalBtn}
                        onPress={() => navigation.navigate('LegalSupport')}
                    >
                        <Text style={styles.legalBtnText}>⚖️ Legal Support</Text>
                    </TouchableOpacity>
                </View>

                {phase !== 'resolved' && (
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => { cancelSOS(); navigation.replace('Main'); }}>
                        <Text style={styles.cancelText}>Cancel SOS</Text>
                    </TouchableOpacity>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.war.bg },
    topBanner: {
        backgroundColor: Colors.war.accent,
        paddingTop: 60, paddingBottom: 18, paddingHorizontal: 24,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    },
    sosLabel: { color: Colors.white, fontSize: 18, fontWeight: '900', letterSpacing: 2 },
    elapsed: { color: Colors.white, fontSize: 22, fontWeight: '800', fontVariant: ['tabular-nums'] },
    scroll: { paddingHorizontal: 20, paddingTop: 20 },
    etaCard: {
        backgroundColor: Colors.war.card,
        borderRadius: 16, borderWidth: 1, borderColor: Colors.war.border,
        padding: 20, marginBottom: 24, alignItems: 'center',
    },
    etaLabel: { color: Colors.war.accentLight, fontWeight: '700', fontSize: 14, marginBottom: 6 },
    etaValue: { color: Colors.white, fontSize: 40, fontWeight: '900' },
    etaLead: { color: Colors.war.textSub, fontSize: 13, marginTop: 6 },
    sectionTitle: {
        color: Colors.war.textSub, fontSize: 11, fontWeight: '700',
        letterSpacing: 2, marginBottom: 14,
    },
    stepsContainer: {
        backgroundColor: Colors.war.card,
        borderRadius: 16, borderWidth: 1, borderColor: Colors.war.border,
        paddingVertical: 8, paddingHorizontal: 16, marginBottom: 20,
    },
    stepRow: {
        flexDirection: 'row', alignItems: 'center',
        paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    stepCircle: {
        width: 36, height: 36, borderRadius: 18,
        borderWidth: 2, borderColor: Colors.war.textMuted,
        alignItems: 'center', justifyContent: 'center', marginRight: 14,
    },
    stepDone: { borderColor: Colors.war.success },
    stepIcon: { fontSize: 18 },
    stepLabel: { flex: 1, color: Colors.war.textSub, fontSize: 14 },
    stepLabelDone: { color: Colors.white, fontWeight: '600' },
    checkmark: { color: Colors.war.success, fontWeight: '800', fontSize: 16 },
    lawyerCard: {
        backgroundColor: 'rgba(0,230,118,0.08)',
        borderRadius: 14, borderWidth: 1, borderColor: 'rgba(0,230,118,0.3)',
        padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 20,
    },
    lawyerIcon: { fontSize: 30, marginRight: 14 },
    lawyerName: { color: Colors.white, fontWeight: '700', fontSize: 15 },
    lawyerSub: { color: Colors.war.success, fontSize: 12, marginTop: 2 },
    liveTag: {
        color: Colors.war.success, fontWeight: '800', fontSize: 11,
        borderWidth: 1, borderColor: Colors.war.success,
        paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
    },
    resolvedBanner: {
        backgroundColor: 'rgba(0,230,118,0.15)',
        borderRadius: 12, borderWidth: 1, borderColor: Colors.war.success,
        padding: 16, marginBottom: 20, alignItems: 'center',
    },
    resolvedText: { color: Colors.war.success, fontWeight: '700', fontSize: 14 },
    actions: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    trackBtn: {
        flex: 1, backgroundColor: Colors.war.card,
        borderRadius: 12, borderWidth: 1, borderColor: Colors.war.border,
        paddingVertical: 14, alignItems: 'center',
    },
    trackBtnText: { color: Colors.white, fontWeight: '600', fontSize: 14 },
    legalBtn: {
        flex: 1, backgroundColor: 'rgba(37,99,235,0.2)',
        borderRadius: 12, borderWidth: 1, borderColor: Colors.peace.accent,
        paddingVertical: 14, alignItems: 'center',
    },
    legalBtnText: { color: Colors.peace.accentLight, fontWeight: '600', fontSize: 14 },
    cancelBtn: {
        borderRadius: 12, borderWidth: 1, borderColor: Colors.war.border,
        paddingVertical: 14, alignItems: 'center',
    },
    cancelText: { color: Colors.war.textSub, fontWeight: '600', fontSize: 14 },
});
