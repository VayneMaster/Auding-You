// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Drawer provides the header
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarActiveTintColor: '#5A67D8',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="Connect" options={{ title: 'Connect' }} />
      <Tabs.Screen name="Farm" options={{ title: 'Farm' }} />
      <Tabs.Screen name="Research" options={{ title: 'Research' }} />
      <Tabs.Screen name="Auding-You" options={{ title: 'Auding-You'}} />
    </Tabs>
  );
}
