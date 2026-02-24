// MedGuardian StatusBadge — color-coded pill badge
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STATUS_COLORS = {
    pending: { bg: '#FEF3C7', text: '#92400E' },
    dispatched: { bg: '#DBEAFE', text: '#1E40AF' },
    en_route: { bg: '#EDE9FE', text: '#5B21B6' },
    on_scene: { bg: '#D1FAE5', text: '#065F46' },
    lawyer_connected: { bg: '#D1FAE5', text: '#065F46' },
    resolved: { bg: '#D1FAE5', text: '#065F46' },
    cancelled: { bg: '#FEE2E2', text: '#991B1B' },
    available: { bg: '#D1FAE5', text: '#065F46' },
    high: { bg: '#FEE2E2', text: '#991B1B' },
    medium: { bg: '#FEF3C7', text: '#92400E' },
    low: { bg: '#DBEAFE', text: '#1E40AF' },
};

const STATUS_LABELS = {
    pending: 'Pending',
    dispatched: 'Dispatched',
    en_route: 'En Route',
    on_scene: 'On Scene',
    lawyer_connected: 'Lawyer Connected',
    resolved: 'Resolved',
    cancelled: 'Cancelled',
    available: 'Available',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
};

export default function StatusBadge({ status, size = 'sm' }) {
    const colors = STATUS_COLORS[status] ?? { bg: '#E5E7EB', text: '#374151' };
    const label = STATUS_LABELS[status] ?? status;
    return (
        <View style={[styles.badge, { backgroundColor: colors.bg }]}>
            <Text style={[styles.text, { color: colors.text, fontSize: size === 'lg' ? 13 : 11 }]}>
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    text: {
        fontWeight: '700',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
    },
});
