// app/_layout.tsx
import { useColorScheme } from '@/hooks/useColorScheme';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      >
        {/* ✅ Only mount the (tabs) group in the Drawer */}
        <Drawer.Screen
          name="(tabs)"
          options={{ title: 'App' }}
        />
      </Drawer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
