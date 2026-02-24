// MedGuardian — Splash Screen
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';

export default function SplashScreen({ navigation }) {
    const opacity = useRef(new Animated.Value(0)).current;
    const scaleVal = useRef(new Animated.Value(0.6)).current;
    const tagOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate shield in
        Animated.parallel([
            Animated.spring(scaleVal, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]).start(() => {
            // Show tagline
            Animated.timing(tagOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
            // Navigate after 2.5s
            setTimeout(() => navigation.replace('Onboarding'), 2500);
        });
    }, []);

    return (
        <LinearGradient colors={['#060F1E', '#0A1628', '#0D1F3E']} style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#060F1E" />

            <Animated.View style={{ opacity, transform: [{ scale: scaleVal }] }}>
                <View style={styles.shieldContainer}>
                    <Text style={styles.shieldEmoji}>🛡️</Text>
                    <View style={styles.pulse1} />
                    <View style={styles.pulse2} />
                </View>
            </Animated.View>

            <Animated.View style={{ opacity, marginTop: 28 }}>
                <Text style={styles.appName}>MedGuardian</Text>
            </Animated.View>

            <Animated.View style={{ opacity: tagOpacity, marginTop: 8 }}>
                <Text style={styles.tagline}>Physician Safety Ecosystem</Text>
            </Animated.View>

            <Animated.View style={[styles.footer, { opacity: tagOpacity }]}>
                <Text style={styles.footerText}>Powered by MedShield™ — Version 1.0</Text>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    shieldContainer: {
        width: 140, height: 140,
        alignItems: 'center', justifyContent: 'center',
    },
    shieldEmoji: { fontSize: 90 },
    pulse1: {
        position: 'absolute',
        width: 160, height: 160, borderRadius: 80,
        borderWidth: 2, borderColor: 'rgba(37,99,235,0.4)',
    },
    pulse2: {
        position: 'absolute',
        width: 200, height: 200, borderRadius: 100,
        borderWidth: 1, borderColor: 'rgba(37,99,235,0.15)',
    },
    appName: {
        color: Colors.white,
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: 2,
        textAlign: 'center',
    },
    tagline: {
        color: Colors.peace.textSub,
        fontSize: 14,
        letterSpacing: 1.5,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute', bottom: 40,
    },
    footerText: {
        color: Colors.peace.textMuted,
        fontSize: 11,
        letterSpacing: 0.5,
    },
});
