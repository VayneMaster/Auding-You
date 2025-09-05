// app/_layout.tsx
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        // This puts the “hamburger” in the header so the menu is hidden until opened
        headerLeft: () => <DrawerToggleButton />,
      }}
    >
      {/* Your tab navigator (route group) becomes a single Drawer screen */}
      <Drawer.Screen
        name="(tabs)"
        options={{ title: 'App' }}
      />

      {/* (Optional) add non-tab pages here to show them in the Drawer too:
      <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
      */}
    </Drawer>
  );
}
