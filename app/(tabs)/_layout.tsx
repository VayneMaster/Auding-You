import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Today' }} />
      <Tabs.Screen name="Connect" options={{ title: "Connect" }} />
      <Tabs.Screen name="Farm" options={{ title: "Farm" }} />
      <Tabs.Screen name="Research" options={{ title: "Research" }} />
    </Tabs>
  );
}
