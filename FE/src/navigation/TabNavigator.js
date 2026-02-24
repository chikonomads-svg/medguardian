// MedGuardian — Bottom Tab Navigator
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/colors';

import MainDashboard from '../screens/dashboard/MainDashboard';
import IRUTracking from '../screens/iru/IRUTracking';
import LegalSupport from '../screens/legal/LegalSupport';
import MediaSupport from '../screens/media/MediaSupport';
import CommunityHub from '../screens/community/CommunityHub';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
    Dashboard: { active: '🛡️', inactive: '🛡️' },
    IRU: { active: '🚨', inactive: '🚨' },
    Legal: { active: '⚖️', inactive: '⚖️' },
    Media: { active: '📢', inactive: '📢' },
    Community: { active: '🤝', inactive: '🤝' },
    Profile: { active: '👤', inactive: '👤' },
};

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.peace.bgSecondary,
                    borderTopColor: Colors.peace.border,
                    borderTopWidth: 1,
                    height: 76,
                    paddingBottom: 12,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    letterSpacing: 0.3,
                },
                tabBarActiveTintColor: Colors.peace.accent,
                tabBarInactiveTintColor: Colors.peace.textMuted,
                tabBarIcon: ({ focused }) => {
                    const icon = TAB_ICONS[route.name];
                    return (
                        <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.6 }}>
                            {icon?.active}
                        </Text>
                    );
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={MainDashboard} options={{ tabBarLabel: 'Shield' }} />
            <Tab.Screen name="IRU" component={IRUTracking} options={{ tabBarLabel: 'IRU' }} />
            <Tab.Screen name="Legal" component={LegalSupport} options={{ tabBarLabel: 'Legal' }} />
            <Tab.Screen name="Media" component={MediaSupport} options={{ tabBarLabel: 'Media' }} />
            <Tab.Screen name="Community" component={CommunityHub} options={{ tabBarLabel: 'Community' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>
    );
}
