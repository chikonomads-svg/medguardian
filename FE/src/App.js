// MedGuardian — Root App Component
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SOSProvider } from './context/SOSContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
    return (
        <SafeAreaProvider>
            <SOSProvider>
                <StatusBar style="light" />
                <AppNavigator />
            </SOSProvider>
        </SafeAreaProvider>
    );
}
