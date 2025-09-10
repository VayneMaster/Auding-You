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
        {/* Main app = tabs */}
        <Drawer.Screen name="(tabs)" options={{ title: 'Home' }} />

        {/* Extra pages (hidden group) */}
        <Drawer.Screen name="(hidden)/brainwaker" options={{ title: 'Brainwaker' }} />
        <Drawer.Screen name="(hidden)/taskling" options={{ title: 'Taskling' }} />
        <Drawer.Screen name="(hidden)/wins" options={{ title: 'Wins' }} />
        <Drawer.Screen name="(hidden)/Tasks" options={{ title: 'Tasks' }} />
        <Drawer.Screen name="(hidden)/hobbies" options={{ title: 'Hobbies' }} />
        <Drawer.Screen name="(hidden)/reminders" options={{ title: 'Reminders' }} />
      </Drawer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}