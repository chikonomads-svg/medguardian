// MedGuardian — Profile Screen
import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';
import GlassCard from '../../components/common/GlassCard';
import StatusBadge from '../../components/common/StatusBadge';
import { DUMMY_DOCTOR, DUMMY_INCIDENTS } from '../../data/dummyData';

const MENU_ITEMS = [
    { icon: '📋', label: 'Incident History', key: 'history' },
    { icon: '💳', label: 'My Membership', key: 'membership' },
    { icon: '🔒', label: 'Security Settings', key: 'security' },
    { icon: '📞', label: 'Emergency Contacts', key: 'contacts' },
    { icon: '📚', label: 'Safety Guidelines', key: 'guidelines' },
    { icon: '⚙️', label: 'App Settings', key: 'settings' },
];

export default function ProfileScreen({ navigation }) {
    const doctor = DUMMY_DOCTOR;

    return (
        <View style={styles.container}>
            {/* Hero */}
            <LinearGradient colors={['#0D1E40', '#0A1628']} style={styles.hero}>
                <View style={styles.avatarCircle}>
                    <Text style={styles.avatarInitials}>{doctor.avatar_initials}</Text>
                </View>
                <Text style={styles.doctorName}>{doctor.full_name}</Text>
                <Text style={styles.specialty}>{doctor.specialty}</Text>
                <Text style={styles.hospital}>{doctor.hospital}</Text>

                {/* Membership badge */}
                <View style={styles.membershipBadge}>
                    <Text style={styles.membershipIcon}>⭐</Text>
                    <Text style={styles.membershipText}>{doctor.membership}</Text>
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Stats row */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNum}>{doctor.incidents_count}</Text>
                        <Text style={styles.statLabel}>Incidents</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statNum}>2</Text>
                        <Text style={styles.statLabel}>Legal Cases</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statNum}>2yr</Text>
                        <Text style={styles.statLabel}>Member Since</Text>
                    </View>
                </View>

                {/* Doctor Info */}
                <GlassCard style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Doctor Details</Text>
                    <InfoRow label="Email" value={doctor.email} />
                    <InfoRow label="Phone" value={doctor.phone} />
                    <InfoRow label="MRN" value={doctor.mrn} />
                    <InfoRow label="Valid Until" value={doctor.membership_valid_until} />
                </GlassCard>

                {/* Incident History */}
                <Text style={styles.sectionTitle}>Recent Incidents</Text>
                {DUMMY_INCIDENTS.map(inc => (
                    <GlassCard key={inc.id} style={styles.incCard}>
                        <View style={styles.incHeader}>
                            <Text style={styles.incLocation}>{inc.location_address}</Text>
                            <StatusBadge status={inc.alert_status} />
                        </View>
                        <Text style={styles.incDetail}>📅 {inc.trigger_time?.substring(0, 10)}</Text>
                        <Text style={styles.incDetail}>🚑 Unit: {inc.assigned_unit ?? 'N/A'}</Text>
                        {inc.severity_level && (
                            <View style={{ marginTop: 4 }}>
                                <StatusBadge status={inc.severity_level} size="sm" />
                            </View>
                        )}
                    </GlassCard>
                ))}

                {/* Menu */}
                <Text style={styles.sectionTitle}>Account</Text>
                <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
                    {MENU_ITEMS.map((item, i) => (
                        <TouchableOpacity
                            key={item.key}
                            style={[styles.menuItem, i < MENU_ITEMS.length - 1 && styles.menuDivider]}
                        >
                            <Text style={styles.menuIcon}>{item.icon}</Text>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Text style={styles.menuArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </GlassCard>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <Text style={styles.version}>MedGuardian v1.0.0 · MedShield™</Text>
                <View style={{ height: 32 }} />
            </ScrollView>
        </View>
    );
}

function InfoRow({ label, value }) {
    return (
        <View style={infoStyles.row}>
            <Text style={infoStyles.label}>{label}</Text>
            <Text style={infoStyles.value}>{value}</Text>
        </View>
    );
}

const infoStyles = StyleSheet.create({
    row: {
        flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8,
        borderBottomWidth: 1, borderBottomColor: Colors.peace.border,
    },
    label: { color: Colors.peace.textMuted, fontSize: 13 },
    value: { color: Colors.peace.text, fontSize: 13, fontWeight: '600', flexShrink: 1, textAlign: 'right' },
});

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.peace.bg },
    hero: {
        paddingTop: 60, paddingBottom: 28, alignItems: 'center',
        borderBottomWidth: 1, borderBottomColor: Colors.peace.border,
    },
    avatarCircle: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: Colors.peace.accent,
        alignItems: 'center', justifyContent: 'center', marginBottom: 12,
        shadowColor: Colors.peace.accent, shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5, shadowRadius: 16, elevation: 8,
    },
    avatarInitials: { color: Colors.white, fontSize: 30, fontWeight: '800' },
    doctorName: { color: Colors.white, fontSize: 20, fontWeight: '800' },
    specialty: { color: Colors.peace.textSub, fontSize: 13, marginTop: 3 },
    hospital: { color: Colors.peace.textMuted, fontSize: 12, marginTop: 2 },
    membershipBadge: {
        flexDirection: 'row', alignItems: 'center',
        marginTop: 12, backgroundColor: 'rgba(37,99,235,0.2)',
        paddingHorizontal: 16, paddingVertical: 6, borderRadius: 100,
        borderWidth: 1, borderColor: Colors.peace.accent,
    },
    membershipIcon: { fontSize: 14, marginRight: 6 },
    membershipText: { color: Colors.peace.accent, fontWeight: '700', fontSize: 13 },
    scroll: { paddingHorizontal: 20, paddingTop: 16 },
    statsRow: {
        flexDirection: 'row', backgroundColor: Colors.peace.card,
        borderRadius: 14, borderWidth: 1, borderColor: Colors.peace.border,
        marginBottom: 18, paddingVertical: 16,
    },
    statBox: { flex: 1, alignItems: 'center' },
    statNum: { color: Colors.white, fontSize: 22, fontWeight: '800' },
    statLabel: { color: Colors.peace.textSub, fontSize: 11, marginTop: 2 },
    statDivider: { width: 1, backgroundColor: Colors.peace.border },
    infoCard: { marginBottom: 18 },
    infoTitle: { color: Colors.white, fontWeight: '700', fontSize: 15, marginBottom: 8 },
    sectionTitle: {
        color: Colors.white, fontSize: 16, fontWeight: '700', marginBottom: 12,
    },
    incCard: { marginBottom: 10 },
    incHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
    incLocation: { color: Colors.white, fontWeight: '700', fontSize: 14, flex: 1, marginRight: 8 },
    incDetail: { color: Colors.peace.textSub, fontSize: 13, marginTop: 3 },
    menuItem: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 18, paddingVertical: 15,
    },
    menuDivider: { borderBottomWidth: 1, borderBottomColor: Colors.peace.border },
    menuIcon: { fontSize: 18, marginRight: 14 },
    menuLabel: { flex: 1, color: Colors.peace.text, fontSize: 15 },
    menuArrow: { color: Colors.peace.textMuted, fontSize: 20 },
    logoutBtn: {
        marginTop: 20, marginBottom: 8,
        borderRadius: 12, borderWidth: 1, borderColor: 'rgba(239,68,68,0.4)',
        paddingVertical: 14, alignItems: 'center',
    },
    logoutText: { color: '#EF4444', fontWeight: '700', fontSize: 15 },
    version: { color: Colors.peace.textMuted, fontSize: 11, textAlign: 'center', marginBottom: 8 },
});
