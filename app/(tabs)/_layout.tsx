import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
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
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
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
        name="brainwaker"
        options={{
          title: 'Brainwaker',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="puzzlepiece.fill" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="wins"
        options={{
          title: 'Wins',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="trophy.fill" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="farm"
        options={{
          title: 'Entling Farm',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="leaf.fill" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="connect"
        options={{
          title: 'Connect',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="message.fill" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="taskling"
        options={{
          title: 'Taskling',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="checkmark.circle.fill" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="hobbies"
        options={{
          title: 'Hobbies',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="cart.fill" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="bell.fill" color={color} size={28} />
          ),
        }}
      />
      {/* If you have a Research tab as well, keep it here */}
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
