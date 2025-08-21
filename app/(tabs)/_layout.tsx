// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/app/constants/Colors';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      {/* Visible tabs ONLY */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="Connect"
        options={{
          title: 'Connect',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="message.fill" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="farm"
        options={{
          title: 'Farm',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="leaf.fill" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="Research"
        options={{
          title: 'Research',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="magnifyingglass" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
