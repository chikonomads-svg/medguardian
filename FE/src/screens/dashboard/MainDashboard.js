// MedGuardian — Main Dashboard (Peace Mode)
import React, { useRef } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Animated, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import EmergencyButton from '../../components/common/EmergencyButton';
import GlassCard from '../../components/common/GlassCard';
import { useSOS } from '../../context/SOSContext';
import { DUMMY_DOCTOR, DUMMY_INCIDENTS } from '../../data/dummyData';

const QUICK_STATS = [
    { icon: '🛡️', label: 'Incidents Handled', value: '2' },
    { icon: '⚖️', label: 'Legal Cases', value: '2' },
    { icon: '🚑', label: 'IRU Units Nearby', value: '2' },
    { icon: '👨‍⚕️', label: 'Community Doctors', value: '5,200+' },
];

export default function MainDashboard({ navigation }) {
    const { triggerSOS, phase } = useSOS();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.04, duration: 1800, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, []);

    function handleSOSTrigger() {
        triggerSOS();
        navigation.navigate('SOSActivation');
    }

    return (
        <LinearGradient colors={['#060F1E', '#0A1628', '#0D1F3E']} style={styles.gradient}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safe}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Good evening,</Text>
                        <Text style={styles.doctorName}>{DUMMY_DOCTOR.full_name}</Text>
                        <Text style={styles.hospital}>{DUMMY_DOCTOR.hospital}</Text>
                    </View>
                    <View style={styles.memberBadge}>
                        <Text style={styles.memberText}>⭐ Premium</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                    {/* Status Banner */}
                    <GlassCard style={styles.statusBanner}>
                        <View style={styles.statusRow}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Shield Active — You are protected</Text>
                        </View>
                        <Text style={styles.statusSub}>IRU Unit MG-21 is 2.4 km away</Text>
                    </GlassCard>

                    {/* SOS Button */}
                    <View style={styles.sosSection}>
                        <Text style={styles.sosSectionLabel}>EMERGENCY SOS</Text>
                        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                            <EmergencyButton
                                onTrigger={handleSOSTrigger}
                                onCountdownStart={() => { }}
                                disabled={phase !== 'idle'}
                            />
                        </Animated.View>
                    </View>

                    {/* Quick Stats */}
                    <Text style={styles.sectionTitle}>Your Protection Overview</Text>
                    <View style={styles.statsGrid}>
                        {QUICK_STATS.map((stat) => (
                            <GlassCard key={stat.label} style={styles.statCard}>
                                <Text style={styles.statIcon}>{stat.icon}</Text>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </GlassCard>
                        ))}
                    </View>

                    {/* Recent incidents */}
                    <Text style={styles.sectionTitle}>Recent Incidents</Text>
                    {DUMMY_INCIDENTS.slice(0, 2).map((inc) => (
                        <GlassCard key={inc.id} style={styles.incidentRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.incidentLocation}>{inc.location_address}</Text>
                                <Text style={styles.incidentTime}>{inc.trigger_time?.substring(0, 10)}</Text>
                            </View>
                            <View style={[styles.badge, inc.alert_status === 'resolved' ? styles.badgeGreen : styles.badgeRed]}>
                                <Text style={styles.badgeText}>{inc.alert_status}</Text>
                            </View>
                        </GlassCard>
                    ))}

                    <View style={{ height: 32 }} />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    safe: { flex: 1 },
    header: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 12, marginBottom: 8,
    },
    greeting: { color: Colors.peace.textSub, fontSize: 13 },
    doctorName: { color: Colors.white, fontSize: 20, fontWeight: '800' },
    hospital: { color: Colors.peace.textMuted, fontSize: 12, marginTop: 2 },
    memberBadge: {
        backgroundColor: 'rgba(37,99,235,0.2)',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: Colors.peace.accent,
    },
    memberText: { color: Colors.peace.accent, fontWeight: '700', fontSize: 12 },
    scroll: { paddingHorizontal: 20, paddingBottom: 20 },
    statusBanner: { marginBottom: 20 },
    statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    statusDot: {
        width: 8, height: 8, borderRadius: 4,
        backgroundColor: Colors.peace.success, marginRight: 8,
    },
    statusText: { color: Colors.peace.text, fontWeight: '600', fontSize: 14 },
    statusSub: { color: Colors.peace.textSub, fontSize: 12 },
    sosSection: { alignItems: 'center', marginVertical: 28 },
    sosSectionLabel: {
        color: Colors.peace.textMuted, fontSize: 11,
        fontWeight: '700', letterSpacing: 2, marginBottom: 16,
    },
    sectionTitle: {
        color: Colors.white, fontSize: 16, fontWeight: '700',
        marginBottom: 12, marginTop: 4,
    },
    statsGrid: {
        flexDirection: 'row', flexWrap: 'wrap',
        justifyContent: 'space-between', marginBottom: 20,
    },
    statCard: {
        width: '48%', alignItems: 'center', marginBottom: 12, padding: 16,
    },
    statIcon: { fontSize: 28, marginBottom: 6 },
    statValue: { color: Colors.white, fontSize: 22, fontWeight: '800' },
    statLabel: { color: Colors.peace.textSub, fontSize: 11, textAlign: 'center', marginTop: 2 },
    incidentRow: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    },
    incidentLocation: { color: Colors.white, fontWeight: '600', fontSize: 14 },
    incidentTime: { color: Colors.peace.textSub, fontSize: 12, marginTop: 2 },
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100 },
    badgeGreen: { backgroundColor: 'rgba(16,185,129,0.2)' },
    badgeRed: { backgroundColor: 'rgba(239,68,68,0.2)' },
    badgeText: { color: Colors.peace.success, fontWeight: '700', fontSize: 11, textTransform: 'uppercase' },
});
