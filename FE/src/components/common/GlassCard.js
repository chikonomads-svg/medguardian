// MedGuardian GlassCard component — premium glassmorphism card
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

export default function GlassCard({ children, style, warMode = false }) {
    const C = warMode ? Colors.war : Colors.peace;
    return (
        <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border }, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
});
