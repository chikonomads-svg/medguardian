// MedGuardian — Login Screen (Demo bypass)
import React, { useState, useRef } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity,
    Animated, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';

export default function LoginScreen({ navigation }) {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const shakeAnim = useRef(new Animated.Value(0)).current;

    function handleLogin() {
        // Demo: bypass auth with any non-empty input
        if (!phone.trim()) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 80, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 80, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 6, duration: 80, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
            ]).start();
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace('Main');
        }, 800);
    }

    function demoLogin() {
        setPhone('+91-9812345678');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace('Main');
        }, 600);
    }

    return (
        <LinearGradient colors={['#060F1E', '#0A1628', '#0F1E3A']} style={styles.container}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inner}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.shieldIcon}>🛡️</Text>
                    <Text style={styles.appName}>MedGuardian</Text>
                    <Text style={styles.subtitle}>Physician Safety Ecosystem</Text>
                </View>

                {/* Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Welcome Back, Doctor</Text>
                    <Text style={styles.cardSub}>Enter your registered phone number</Text>

                    <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                        <View style={styles.inputRow}>
                            <Text style={styles.flagEmoji}>🇮🇳</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="+91 XXXXX XXXXX"
                                placeholderTextColor={Colors.peace.textMuted}
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                                maxLength={14}
                            />
                        </View>
                    </Animated.View>

                    <TouchableOpacity
                        style={[styles.loginBtn, loading && styles.loginBtnLoading]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.loginBtnText}>{loading ? 'Verifying...' : 'Send OTP →'}</Text>
                    </TouchableOpacity>

                    {/* Demo bypass */}
                    <TouchableOpacity style={styles.demoBtn} onPress={demoLogin}>
                        <Text style={styles.demoBtnText}>🎯  Demo Login (Skip Auth)</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footer}>
                    By continuing, you agree to MedGuardian's{'\n'}Terms of Service & Privacy Policy
                </Text>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    inner: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
    header: { alignItems: 'center', marginBottom: 36 },
    shieldIcon: { fontSize: 56, marginBottom: 8 },
    appName: { color: Colors.white, fontSize: 28, fontWeight: '800', letterSpacing: 1.5 },
    subtitle: { color: Colors.peace.textSub, fontSize: 13, marginTop: 4, letterSpacing: 0.5 },
    card: {
        width: '100%',
        backgroundColor: Colors.peace.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.peace.border,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
    },
    cardTitle: { color: Colors.white, fontSize: 20, fontWeight: '700', marginBottom: 4 },
    cardSub: { color: Colors.peace.textSub, fontSize: 13, marginBottom: 20 },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.peace.bgSecondary,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.peace.border,
        paddingHorizontal: 14,
        marginBottom: 16,
    },
    flagEmoji: { fontSize: 22, marginRight: 8 },
    input: { flex: 1, color: Colors.white, fontSize: 16, paddingVertical: 14 },
    loginBtn: {
        backgroundColor: Colors.peace.accent,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    loginBtnLoading: { opacity: 0.7 },
    loginBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
    demoBtn: {
        marginTop: 12,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.peace.border,
    },
    demoBtnText: { color: Colors.peace.textSub, fontSize: 14 },
    footer: {
        color: Colors.peace.textMuted,
        fontSize: 11,
        textAlign: 'center',
        marginTop: 24,
        lineHeight: 18,
    },
});
