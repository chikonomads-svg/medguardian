// MedGuardian — Onboarding Slider (3 slides)
import React, { useRef, useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, Dimensions,
    TouchableOpacity, Animated, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        emoji: '🚨',
        title: 'Instant Crisis Response',
        subtitle: 'IRU units dispatched in under 15 minutes. Private trained security teams — ready 24/7.',
        accent: Colors.peace.accent,
    },
    {
        id: '2',
        emoji: '⚖️',
        title: 'Legal & Media Shield',
        subtitle: 'Pre-certified lawyers on standby. FIR drafted before police arrive. Your narrative, protected.',
        accent: '#7C3AED',
    },
    {
        id: '3',
        emoji: '🤝',
        title: 'Doctor Community',
        subtitle: 'Connect with 5,000+ verified doctors. Share, seek support, and never face a crisis alone.',
        accent: Colors.peace.success,
    },
];

export default function OnboardingSlider({ navigation }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatRef = useRef(null);

    function onScroll(e) {
        const idx = Math.round(e.nativeEvent.contentOffset.x / width);
        setActiveIndex(idx);
    }

    function next() {
        if (activeIndex < SLIDES.length - 1) {
            flatRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
        } else {
            navigation.replace('Login');
        }
    }

    return (
        <LinearGradient colors={['#060F1E', '#0A1628']} style={styles.container}>
            <StatusBar barStyle="light-content" />

            <FlatList
                ref={flatRef}
                data={SLIDES}
                horizontal pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onScroll={onScroll}
                scrollEventThrottle={16}
                renderItem={({ item }) => (
                    <View style={[styles.slide]}>
                        <Text style={styles.emoji}>{item.emoji}</Text>
                        <Text style={[styles.title, { color: item.accent }]}>{item.title}</Text>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                    </View>
                )}
            />

            {/* Dots */}
            <View style={styles.dotsRow}>
                {SLIDES.map((_, i) => (
                    <View
                        key={i}
                        style={[styles.dot, i === activeIndex && styles.dotActive]}
                    />
                ))}
            </View>

            {/* CTA */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.replace('Login')}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.nextBtn} onPress={next}>
                    <Text style={styles.nextText}>
                        {activeIndex === SLIDES.length - 1 ? 'Get Started →' : 'Next →'}
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    slide: {
        width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingBottom: 120,
    },
    emoji: { fontSize: 80, marginBottom: 32 },
    title: {
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        letterSpacing: 0.5,
        marginBottom: 16,
    },
    subtitle: {
        color: Colors.peace.textSub,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 100,
        width: '100%',
    },
    dot: {
        width: 8, height: 8, borderRadius: 4,
        backgroundColor: Colors.peace.border,
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: Colors.peace.accent,
        width: 24,
    },
    footer: {
        position: 'absolute', bottom: 44,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
    },
    skipBtn: { padding: 12 },
    skipText: { color: Colors.peace.textMuted, fontSize: 15 },
    nextBtn: {
        backgroundColor: Colors.peace.accent,
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 100,
    },
    nextText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
});
