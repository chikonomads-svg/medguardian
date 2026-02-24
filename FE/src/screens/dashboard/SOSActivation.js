// MedGuardian — SOS Activation (3-2-1 Countdown) Screen
import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';
import { useSOS } from '../../context/SOSContext';

export default function SOSActivation({ navigation }) {
    const [count, setCount] = useState(3);
    const [cancelled, setCancelled] = useState(false);
    const { triggerSOS, cancelSOS, phase } = useSOS();
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const redBg = useRef(new Animated.Value(0)).current;
    const intervalRef = useRef(null);

    useEffect(() => {
        // Pulse with each count
        function pulseTick() {
            Animated.sequence([
                Animated.timing(scale, { toValue: 1.3, duration: 200, useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 300, useNativeDriver: true }),
            ]).start();
        }

        pulseTick();
        intervalRef.current = setInterval(() => {
            setCount((c) => {
                if (c <= 1) {
                    clearInterval(intervalRef.current);
                    // Navigate to War Mode after brief flash
                    Animated.timing(redBg, { toValue: 1, duration: 400, useNativeDriver: false }).start(() => {
                        navigation.replace('EmergencyActive');
                    });
                    return 0;
                }
                pulseTick();
                return c - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    function handleCancel() {
        clearInterval(intervalRef.current);
        setCancelled(true);
        cancelSOS();
        navigation.replace('Main');
    }

    const bgColor = redBg.interpolate({
        inputRange: [0, 1],
        outputRange: ['#0D0D0D', Colors.war.accent],
    });

    return (
        <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
            <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

            <Text style={styles.warningLabel}>⚠️  SOS ACTIVATING</Text>

            <Animated.Text style={[styles.countdown, { transform: [{ scale }] }]}>
                {count === 0 ? '🚨' : count}
            </Animated.Text>

            <Text style={styles.subLabel}>
                {count > 0 ? 'Dispatching IRU Unit…' : 'Alert Sent! IRU Dispatched.'}
            </Text>

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>📍 Location: AIIMS New Delhi</Text>
                <Text style={styles.infoText}>📞 IRU Unit: MG-21 — Rajesh Patil</Text>
                <Text style={styles.infoText}>⚖️  Lawyer: Adv. Priya Sharma</Text>
            </View>

            {count > 0 && (
                <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                    <Text style={styles.cancelText}>✕  Cancel SOS</Text>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32,
    },
    warningLabel: {
        color: Colors.war.accentLight,
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 3,
        marginBottom: 32,
    },
    countdown: {
        color: Colors.white,
        fontSize: 120,
        fontWeight: '900',
        lineHeight: 130,
    },
    subLabel: {
        color: Colors.war.textSub,
        fontSize: 15,
        marginTop: 20,
        letterSpacing: 1,
        textAlign: 'center',
    },
    infoBox: {
        marginTop: 36,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,23,68,0.3)',
        padding: 18,
        gap: 8,
    },
    infoText: { color: Colors.war.text, fontSize: 14, marginBottom: 4 },
    cancelBtn: {
        marginTop: 48,
        paddingHorizontal: 36,
        paddingVertical: 14,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.war.accentLight,
    },
    cancelText: { color: Colors.war.accentLight, fontWeight: '700', fontSize: 16 },
});
