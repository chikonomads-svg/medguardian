// MedGuardian — Legal Support Screen
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Modal, TextInput,
} from 'react-native';
import { Colors } from '../../theme/colors';
import GlassCard from '../../components/common/GlassCard';
import StatusBadge from '../../components/common/StatusBadge';
import { DUMMY_LAWYERS, DUMMY_INCIDENTS, FIR_TEMPLATE } from '../../data/dummyData';

export default function LegalSupport() {
    const [activeTab, setActiveTab] = useState('cases');
    const [showFIR, setShowFIR] = useState(false);

    const cases = DUMMY_INCIDENTS.filter(i => i.alert_status === 'resolved').map(inc => ({
        id: inc.id,
        location: inc.location_address,
        date: inc.trigger_time?.substring(0, 10),
        lawyer: inc.lawyer_assigned,
        status: 'settled',
    }));

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>⚖️  Legal Support</Text>
                <Text style={styles.headerSub}>MedGuardian Legal Cell</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabRow}>
                {['cases', 'lawyers', 'fir'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab === 'cases' ? 'My Cases' : tab === 'lawyers' ? 'Lawyers' : 'FIR Template'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* MY CASES */}
                {activeTab === 'cases' && (
                    <>
                        <Text style={styles.sectionSub}>Your incident cases below</Text>
                        {cases.map(c => (
                            <GlassCard key={c.id} style={styles.caseCard}>
                                <View style={styles.caseHeader}>
                                    <Text style={styles.caseLocation}>{c.location}</Text>
                                    <StatusBadge status={c.status} />
                                </View>
                                <Text style={styles.caseDetail}>📅 {c.date}</Text>
                                <Text style={styles.caseDetail}>⚖️ {c.lawyer ?? 'No lawyer assigned'}</Text>
                            </GlassCard>
                        ))}
                    </>
                )}

                {/* LAWYERS */}
                {activeTab === 'lawyers' && (
                    <>
                        <Text style={styles.sectionSub}>On-call lawyers — available 24/7</Text>
                        {DUMMY_LAWYERS.map(l => (
                            <GlassCard key={l.id} style={styles.lawyerCard}>
                                <View style={styles.lawyerTop}>
                                    <View style={styles.avatarCircle}>
                                        <Text style={{ fontSize: 22 }}>👩‍⚖️</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.lawyerName}>{l.full_name}</Text>
                                        <Text style={styles.lawyerSpec}>{l.specialty}</Text>
                                    </View>
                                    <View style={styles.availDot} />
                                </View>
                                <Text style={styles.lawyerDetail}>📍 {l.city} · {l.experience_years} yrs experience</Text>
                                <Text style={styles.lawyerDetail}>📋 Bar # {l.bar_number}</Text>
                                <TouchableOpacity style={styles.contactBtn}>
                                    <Text style={styles.contactBtnText}>📞 Contact Now</Text>
                                </TouchableOpacity>
                            </GlassCard>
                        ))}
                    </>
                )}

                {/* FIR TEMPLATE */}
                {activeTab === 'fir' && (
                    <>
                        <Text style={styles.sectionSub}>Pre-approved FIR draft template</Text>
                        <GlassCard style={styles.firCard}>
                            <Text style={styles.firText}>{FIR_TEMPLATE}</Text>
                        </GlassCard>
                        <TouchableOpacity style={styles.copyBtn}>
                            <Text style={styles.copyBtnText}>📋 Copy Template</Text>
                        </TouchableOpacity>
                    </>
                )}
                <View style={{ height: 32 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.peace.bg },
    header: {
        paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12,
        borderBottomWidth: 1, borderBottomColor: Colors.peace.border,
    },
    headerTitle: { color: Colors.white, fontSize: 22, fontWeight: '800' },
    headerSub: { color: Colors.peace.textSub, fontSize: 12, marginTop: 2 },
    tabRow: {
        flexDirection: 'row', paddingHorizontal: 20, paddingTop: 12,
        borderBottomWidth: 1, borderBottomColor: Colors.peace.border,
    },
    tab: { flex: 1, paddingBottom: 10, alignItems: 'center' },
    tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.peace.accent },
    tabText: { color: Colors.peace.textMuted, fontWeight: '600', fontSize: 13 },
    tabTextActive: { color: Colors.peace.accent },
    scroll: { paddingHorizontal: 20, paddingTop: 16 },
    sectionSub: { color: Colors.peace.textSub, fontSize: 13, marginBottom: 14 },
    caseCard: { marginBottom: 12 },
    caseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    caseLocation: { color: Colors.white, fontWeight: '700', fontSize: 14, flex: 1, marginRight: 8 },
    caseDetail: { color: Colors.peace.textSub, fontSize: 13, marginTop: 3 },
    lawyerCard: { marginBottom: 14 },
    lawyerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    avatarCircle: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: Colors.peace.border, alignItems: 'center', justifyContent: 'center', marginRight: 12,
    },
    lawyerName: { color: Colors.white, fontWeight: '700', fontSize: 15 },
    lawyerSpec: { color: Colors.peace.textSub, fontSize: 12, marginTop: 2 },
    availDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.peace.success },
    lawyerDetail: { color: Colors.peace.textSub, fontSize: 13, marginTop: 3 },
    contactBtn: {
        marginTop: 12, backgroundColor: Colors.peace.accent,
        borderRadius: 10, paddingVertical: 10, alignItems: 'center',
    },
    contactBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
    firCard: { backgroundColor: Colors.peace.bgSecondary },
    firText: { color: Colors.peace.textSub, fontSize: 12, lineHeight: 20, fontFamily: 'monospace' },
    copyBtn: {
        marginTop: 12, borderRadius: 10, borderWidth: 1, borderColor: Colors.peace.border,
        paddingVertical: 12, alignItems: 'center',
    },
    copyBtnText: { color: Colors.peace.text, fontWeight: '600', fontSize: 14 },
});
