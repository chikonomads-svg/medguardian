// MedGuardian — Long-press Shield Emergency Button
// Animates a fill arc on long-press to trigger SOS
import React, { useRef } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Animated,
    PanResponder, Platform
} from 'react-native';
import { Colors } from '../../theme/colors';

export default function EmergencyButton({ onTrigger, onCountdownStart, disabled = false }) {
    const progress = useRef(new Animated.Value(0)).current;
    const pressTimer = useRef(null);
    const holdDuration = 1500; // 1.5 s hold to trigger

    function handlePressIn() {
        if (disabled) return;
        onCountdownStart?.();
        Animated.timing(progress, {
            toValue: 1,
            duration: holdDuration,
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) onTrigger?.();
        });
    }

    function handlePressOut() {
        progress.stopAnimation();
        Animated.timing(progress, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }

    const ringColor = progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [Colors.peace.shieldGlow, Colors.war.accentGlow, Colors.war.accent],
    });

    const scale = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.08],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.outerRing, { borderColor: ringColor, transform: [{ scale }] }]}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={disabled}
                    style={styles.button}
                >
                    <Text style={styles.shieldIcon}>🛡️</Text>
                    <Text style={styles.label}>HOLD FOR SOS</Text>
                </TouchableOpacity>
            </Animated.View>
            <Text style={styles.hint}>Press and hold for 2 seconds to trigger</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center' },
    outerRing: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.peace.shieldGlow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 10,
    },
    button: {
        width: 154,
        height: 154,
        borderRadius: 77,
        backgroundColor: Colors.peace.shield,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shieldIcon: { fontSize: 54 },
    label: {
        color: Colors.white,
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginTop: 6,
    },
    hint: {
        color: Colors.peace.textMuted,
        fontSize: 12,
        marginTop: 16,
        letterSpacing: 0.3,
    },
});
