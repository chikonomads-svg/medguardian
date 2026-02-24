// MedGuardian — Community Hub Screen
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { Colors } from '../../theme/colors';
import GlassCard from '../../components/common/GlassCard';
import { DUMMY_COMMUNITY_POSTS } from '../../data/dummyData';

const POST_TYPE_ICONS = {
    incident_share: '🚨',
    support: '🤝',
    advice: '💡',
    question: '❓',
};

const FILTER_TABS = ['All', 'Incident', 'Support', 'Advice', 'Question'];

export default function CommunityHub() {
    const [posts, setPosts] = useState(DUMMY_COMMUNITY_POSTS);
    const [filter, setFilter] = useState('All');

    function toggleUpvote(id) {
        setPosts(prev =>
            prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p)
        );
    }

    const filterMap = { Incident: 'incident_share', Support: 'support', Advice: 'advice', Question: 'question' };
    const filtered = filter === 'All' ? posts : posts.filter(p => p.post_type === filterMap[filter]);

    function renderPost({ item }) {
        return (
            <GlassCard style={styles.postCard}>
                {/* Author */}
                <View style={styles.postHeader}>
                    <View style={styles.avatarBox}>
                        <Text style={{ fontSize: 20 }}>
                            {item.is_anonymous ? '🎭' : '👨‍⚕️'}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.authorName}>{item.author}</Text>
                        <Text style={styles.authorSpec}>{item.specialty} · {item.created_at}</Text>
                    </View>
                    <Text style={styles.typeIcon}>{POST_TYPE_ICONS[item.post_type]}</Text>
                </View>

                {/* Content */}
                <Text style={styles.postContent}>{item.content}</Text>

                {/* Footer */}
                <View style={styles.postFooter}>
                    <TouchableOpacity style={styles.upvoteBtn} onPress={() => toggleUpvote(item.id)}>
                        <Text style={styles.upvoteText}>▲  {item.upvotes}</Text>
                    </TouchableOpacity>
                    <Text style={styles.commentCount}>💬  {item.comments_count}</Text>
                    {item.is_anonymous && (
                        <View style={styles.anonBadge}>
                            <Text style={styles.anonText}>Anonymous</Text>
                        </View>
                    )}
                </View>
            </GlassCard>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>🤝  Doctor Community</Text>
                <Text style={styles.headerSub}>5,200+ verified physicians · Safe space</Text>
            </View>

            {/* Filter Pills */}
            <View style={styles.filterRow}>
                {FILTER_TABS.map(f => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.filterPill, filter === f && styles.filterPillActive]}
                        onPress={() => setFilter(f)}
                    >
                        <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={renderPost}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ height: 32 }} />}
            />
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
    filterRow: {
        flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12,
        gap: 8, flexWrap: 'wrap',
    },
    filterPill: {
        paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100,
        backgroundColor: Colors.peace.card, borderWidth: 1, borderColor: Colors.peace.border,
    },
    filterPillActive: { borderColor: Colors.peace.accent, backgroundColor: 'rgba(37,99,235,0.18)' },
    filterText: { color: Colors.peace.textMuted, fontWeight: '600', fontSize: 12 },
    filterTextActive: { color: Colors.peace.accent },
    list: { paddingHorizontal: 16, paddingTop: 8 },
    postCard: { marginBottom: 14 },
    postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    avatarBox: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: Colors.peace.border,
        alignItems: 'center', justifyContent: 'center', marginRight: 10,
    },
    authorName: { color: Colors.white, fontWeight: '700', fontSize: 14 },
    authorSpec: { color: Colors.peace.textMuted, fontSize: 11, marginTop: 2 },
    typeIcon: { fontSize: 22 },
    postContent: { color: Colors.peace.textSub, fontSize: 14, lineHeight: 21, marginBottom: 12 },
    postFooter: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    upvoteBtn: {
        paddingHorizontal: 14, paddingVertical: 6,
        backgroundColor: 'rgba(37,99,235,0.15)',
        borderRadius: 100, borderWidth: 1, borderColor: Colors.peace.border,
    },
    upvoteText: { color: Colors.peace.accent, fontWeight: '700', fontSize: 13 },
    commentCount: { color: Colors.peace.textSub, fontSize: 13 },
    anonBadge: {
        marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 4,
        backgroundColor: 'rgba(100,100,100,0.25)', borderRadius: 100,
    },
    anonText: { color: Colors.peace.textMuted, fontSize: 11, fontWeight: '600' },
});
