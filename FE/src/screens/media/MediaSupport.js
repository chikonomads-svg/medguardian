// MedGuardian — Media Support Screen
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Colors } from '../../theme/colors';
import GlassCard from '../../components/common/GlassCard';
import { MEDIA_STATEMENTS } from '../../data/dummyData';

const SENTIMENT_FEED = [
    {
        platform: 'Twitter / X', icon: '🐦', sentiment: 'neutral', mentions: 24,
        summary: 'Doctor safety in Mumbai trending mildly. Mixed reactions.'
    },
    {
        platform: 'Facebook', icon: '📘', sentiment: 'positive', mentions: 67,
        summary: 'Support posts for healthcare workers gaining strong traction.'
    },
    {
        platform: 'News Media', icon: '📰', sentiment: 'negative', mentions: 3,
        summary: '3 articles on hospital violence published today — monitoring.'
    },
];

const SENTIMENT_COLOR = { positive: Colors.peace.success, neutral: Colors.peace.warning, negative: Colors.war.accent };

export default function MediaSupport() {
    const [activeTab, setActiveTab] = useState('statements');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>📢  Media Wing</Text>
                <Text style={styles.headerSub}>Narrative & Reputation Management</Text>
            </View>

            <View style={styles.tabRow}>
                {['statements', 'monitoring'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab === 'statements' ? 'Press Statements' : 'Social Monitoring'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {activeTab === 'statements' && (
                    <>
                        <Text style={styles.sectionSub}>Official statements drafted by the Media Cell</Text>
                        {MEDIA_STATEMENTS.map(stmt => (
                            <GlassCard key={stmt.id} style={styles.stmtCard}>
                                <View style={styles.stmtHeader}>
                                    <Text style={styles.stmtTitle}>{stmt.title}</Text>
                                    <View style={[styles.stmtBadge, stmt.status === 'published' ? styles.badgeGreen : styles.badgeGray]}>
                                        <Text style={styles.badgeText}>{stmt.status.toUpperCase()}</Text>
                                    </View>
                                </View>
                                <Text style={styles.stmtDate}>Published: {stmt.published_at}</Text>
                                <Text style={styles.stmtContent}>{stmt.content}</Text>
                            </GlassCard>
                        ))}

                        {/* Draft new */}
                        <GlassCard style={[styles.stmtCard, styles.draftCard]}>
                            <Text style={styles.draftIcon}>✍️</Text>
                            <Text style={styles.draftTitle}>Draft a New Statement</Text>
                            <Text style={styles.draftSub}>Media Cell reviews within 2 hours</Text>
                            <TouchableOpacity style={styles.draftBtn}>
                                <Text style={styles.draftBtnText}>+ Create Draft</Text>
                            </TouchableOpacity>
                        </GlassCard>
                    </>
                )}

                {activeTab === 'monitoring' && (
                    <>
                        <Text style={styles.sectionSub}>Real-time social media sentiment analysis</Text>
                        {SENTIMENT_FEED.map((item) => (
                            <GlassCard key={item.platform} style={styles.feedCard}>
                                <View style={styles.feedTop}>
                                    <Text style={styles.feedIcon}>{item.icon}</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.feedPlatform}>{item.platform}</Text>
                                        <Text style={styles.feedMentions}>{item.mentions} mentions today</Text>
                                    </View>
                                    <View style={[styles.sentimentDot, { backgroundColor: SENTIMENT_COLOR[item.sentiment] }]} />
                                    <Text style={[styles.sentimentLabel, { color: SENTIMENT_COLOR[item.sentiment] }]}>
                                        {item.sentiment}
                                    </Text>
                                </View>
                                <Text style={styles.feedSummary}>{item.summary}</Text>
                            </GlassCard>
                        ))}
                        <GlassCard style={styles.reportCard}>
                            <Text style={styles.reportTitle}>🚨 Report Fake News</Text>
                            <Text style={styles.reportSub}>Flag misinformation for our media team to counter</Text>
                            <TouchableOpacity style={styles.reportBtn}>
                                <Text style={styles.reportBtnText}>Submit Report</Text>
                            </TouchableOpacity>
                        </GlassCard>
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
    stmtCard: { marginBottom: 14 },
    stmtHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
    stmtTitle: { color: Colors.white, fontWeight: '700', fontSize: 14, flex: 1, marginRight: 8 },
    stmtBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100 },
    badgeGreen: { backgroundColor: 'rgba(16,185,129,0.2)' },
    badgeGray: { backgroundColor: 'rgba(100,100,100,0.3)' },
    badgeText: { fontWeight: '800', fontSize: 9, color: Colors.peace.success },
    stmtDate: { color: Colors.peace.textMuted, fontSize: 12, marginBottom: 8 },
    stmtContent: { color: Colors.peace.textSub, fontSize: 13, lineHeight: 20 },
    draftCard: { alignItems: 'center', padding: 24 },
    draftIcon: { fontSize: 32, marginBottom: 8 },
    draftTitle: { color: Colors.white, fontWeight: '700', fontSize: 16, marginBottom: 4 },
    draftSub: { color: Colors.peace.textSub, fontSize: 12, marginBottom: 16 },
    draftBtn: {
        backgroundColor: Colors.peace.accent, borderRadius: 10,
        paddingHorizontal: 24, paddingVertical: 10,
    },
    draftBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
    feedCard: { marginBottom: 12 },
    feedTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    feedIcon: { fontSize: 26, marginRight: 12 },
    feedPlatform: { color: Colors.white, fontWeight: '700', fontSize: 14 },
    feedMentions: { color: Colors.peace.textSub, fontSize: 12 },
    sentimentDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    sentimentLabel: { fontWeight: '700', fontSize: 12, textTransform: 'capitalize' },
    feedSummary: { color: Colors.peace.textSub, fontSize: 13, lineHeight: 19 },
    reportCard: { marginTop: 4 },
    reportTitle: { color: Colors.white, fontWeight: '700', fontSize: 16, marginBottom: 4 },
    reportSub: { color: Colors.peace.textSub, fontSize: 13, marginBottom: 14 },
    reportBtn: {
        borderRadius: 10, borderWidth: 1, borderColor: Colors.war.accent,
        paddingVertical: 10, alignItems: 'center',
    },
    reportBtnText: { color: Colors.war.accent, fontWeight: '700', fontSize: 14 },
});
