// MedGuardian — IRU Tracking Screen
// Shows simulated IRU movement on a styled map view
import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity,
} from 'react-native';
import { Colors } from '../../theme/colors';
import GlassCard from '../../components/common/GlassCard';
import { useSOS } from '../../context/SOSContext';
import { DUMMY_IRU_UNITS } from '../../data/dummyData';

// Simulated map placeholder — a styled grid with moving marker
function SimulatedMap({ eta }) {
    const markerAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(markerAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
                Animated.timing(markerAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const translateX = markerAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 60] });
    const translateY = markerAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -40] });

    return (
        <View style={mapStyles.container}>
            {/* Simulated map grid lines */}
            {[...Array(6)].map((_, i) => (
                <View key={`h${i}`} style={[mapStyles.hLine, { top: 40 + i * 36 }]} />
            ))}
            {[...Array(6)].map((_, i) => (
                <View key={`v${i}`} style={[mapStyles.vLine, { left: 40 + i * 45 }]} />
            ))}

            {/* Doctor location (fixed) */}
            <View style={mapStyles.doctorPin}>
                <Text style={{ fontSize: 22 }}>📍</Text>
                <Text style={mapStyles.pinLabel}>You</Text>
            </View>

            {/* IRU marker (animated) */}
            <Animated.View style={[mapStyles.iruPin, { transform: [{ translateX }, { translateY }] }]}>
                <Text style={{ fontSize: 22 }}>🚨</Text>
                <Text style={mapStyles.iruLabel}>MG-21</Text>
            </Animated.View>

            {/* ETA overlay */}
            <View style={mapStyles.etaOverlay}>
                <Text style={mapStyles.etaText}>ETA: {eta ?? 12} min</Text>
            </View>
        </View>
    );
}

const mapStyles = StyleSheet.create({
    container: {
        height: 240, backgroundColor: '#0E1B2D',
        borderRadius: 16, borderWidth: 1,
        borderColor: Colors.peace.border, overflow: 'hidden',
        marginBottom: 20,
    },
    hLine: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(30,58,95,0.6)' },
    vLine: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(30,58,95,0.6)' },
    doctorPin: { position: 'absolute', bottom: 50, right: 60, alignItems: 'center' },
    pinLabel: { color: Colors.peace.accent, fontSize: 11, fontWeight: '700' },
    iruPin: { position: 'absolute', bottom: 80, left: 40, alignItems: 'center' },
    iruLabel: { color: Colors.war.accentLight, fontSize: 11, fontWeight: '700' },
    etaOverlay: {
        position: 'absolute', top: 12, right: 12,
        backgroundColor: 'rgba(255,23,68,0.85)',
        paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100,
    },
    etaText: { color: Colors.white, fontWeight: '800', fontSize: 13 },
});

export default function IRUTracking({ navigation }) {
    const { incident } = useSOS();
    const unit = DUMMY_IRU_UNITS[0];
    const eta = incident?.eta_minutes ?? 12;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={{ color: Colors.peace.accent, fontSize: 15 }}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>IRU Live Tracking</Text>
                <View style={styles.liveDot} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Map */}
                <SimulatedMap eta={eta} />

                {/* Unit Info */}
                <GlassCard style={{ marginBottom: 16 }}>
                    <View style={styles.unitRow}>
                        <Text style={styles.unitCode}>🚗  Unit {unit.unit_code}</Text>
                        <View style={styles.availBadge}>
                            <Text style={styles.availText}>DISPATCHED</Text>
                        </View>
                    </View>
                    <Text style={styles.unitDetail}>Team Lead: {unit.team_lead}</Text>
                    <Text style={styles.unitDetail}>Contact: {unit.team_lead_phone}</Text>
                    <Text style={styles.unitDetail}>Vehicle: {unit.vehicle}</Text>
                    <Text style={styles.unitDetail}>Team Size: {unit.team_size} members</Text>
                </GlassCard>

                {/* ETA Progress bar */}
                <GlassCard style={{ marginBottom: 16 }}>
                    <Text style={styles.etaTitle}>Estimated Arrival</Text>
                    <Text style={styles.etaValue}>{eta} minutes</Text>
                    <View style={styles.progressBg}>
                        <View style={[styles.progressFill, { width: `${Math.max(10, 100 - eta * 5)}%` }]} />
                    </View>
                    <Text style={styles.progressLabel}>IRU is approaching your location</Text>
                </GlassCard>

                {/* Region Info */}
                <GlassCard>
                    <Text style={styles.regionTitle}>📡 Coverage Zone</Text>
                    <Text style={styles.regionText}>City: {unit.city}</Text>
                    <Text style={styles.regionText}>Region: {unit.region}</Text>
                    <Text style={styles.regionText}>Coords: {unit.latitude}°N, {unit.longitude}°E</Text>
                </GlassCard>

                <View style={{ height: 32 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.peace.bg },
    header: {
        flexDirection: 'row', alignItems: 'center',
        paddingTop: 56, paddingHorizontal: 20, paddingBottom: 16,
        borderBottomWidth: 1, borderBottomColor: Colors.peace.border,
    },
    backBtn: { marginRight: 12 },
    headerTitle: { flex: 1, color: Colors.white, fontSize: 18, fontWeight: '700' },
    liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.peace.success },
    scroll: { paddingHorizontal: 20, paddingTop: 20 },
    unitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    unitCode: { color: Colors.white, fontWeight: '700', fontSize: 16 },
    availBadge: {
        backgroundColor: 'rgba(255,23,68,0.15)',
        paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100,
        borderWidth: 1, borderColor: Colors.war.accent,
    },
    availText: { color: Colors.war.accent, fontWeight: '800', fontSize: 10 },
    unitDetail: { color: Colors.peace.textSub, fontSize: 13, marginTop: 4 },
    etaTitle: { color: Colors.peace.textSub, fontSize: 12, fontWeight: '700', marginBottom: 6 },
    etaValue: { color: Colors.white, fontSize: 32, fontWeight: '900', marginBottom: 12 },
    progressBg: {
        height: 6, backgroundColor: Colors.peace.border,
        borderRadius: 3, overflow: 'hidden', marginBottom: 8,
    },
    progressFill: {
        height: '100%', backgroundColor: Colors.war.accent, borderRadius: 3,
    },
    progressLabel: { color: Colors.peace.textMuted, fontSize: 12 },
    regionTitle: { color: Colors.white, fontWeight: '700', fontSize: 14, marginBottom: 8 },
    regionText: { color: Colors.peace.textSub, fontSize: 13, marginTop: 3 },
});
