// MedGuardian — Root App Navigator (Stack)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingSlider from '../screens/onboarding/OnboardingSlider';
import LoginScreen from '../screens/auth/LoginScreen';
import TabNavigator from './TabNavigator';
import SOSActivation from '../screens/dashboard/SOSActivation';
import EmergencyActive from '../screens/dashboard/EmergencyActive';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingSlider} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Main" component={TabNavigator} />
                {/* SOS overlay screens — stack on top of tabs */}
                <Stack.Screen
                    name="SOSActivation"
                    component={SOSActivation}
                    options={{ presentation: 'modal' }}
                />
                <Stack.Screen
                    name="EmergencyActive"
                    component={EmergencyActive}
                    options={{ presentation: 'fullScreenModal' }}
                />
                <Stack.Screen
                    name="IRUTracking"
                    component={require('../screens/iru/IRUTracking').default}
                />
                <Stack.Screen
                    name="LegalSupport"
                    component={require('../screens/legal/LegalSupport').default}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
