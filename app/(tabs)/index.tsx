// app/(tabs)/index.tsx
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ValidPath, isTabPath } from '../constants/routes';

export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();

  const [menuVisible, setMenuVisible] = useState(false);
  const [onHome, setOnHome] = useState(true);

  useEffect(() => {
    // home is the group root: '/(tabs)'
    setOnHome(pathname === '/(tabs)' || pathname === '/');
  }, [pathname]);

  const toggleMenu = () => setMenuVisible(v => !v);

  const openPath = (path: ValidPath) => {
    setMenuVisible(false);
    if (isTabPath(path)) {
      router.replace(path); // switch tab
    } else {
      router.push(path); // open standalone screen above tabs
    }
  };

  // Typed constants so TS narrows correctly
  const paths = {
    home: '/(tabs)' as ValidPath,
    connect: '/(tabs)/Connect' as ValidPath,
    farm: '/(tabs)/farm' as ValidPath,
    research: '/(tabs)/Research' as ValidPath,
    brainwaker: '/brainwaker' as ValidPath,
    wins: '/wins' as ValidPath,
    taskling: '/taskling' as ValidPath,
    hobbies: '/hobbies' as ValidPath,
    reminders: '/reminders' as ValidPath,
  };

  return (
    <View style={styles.container}>
      {/* ☰ Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {onHome && <Text style={styles.welcome}>Nice seeing you!</Text>}

      {/* Menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => openPath(paths.brainwaker)}>
            <Text>🧩 Brain Waker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openPath(paths.hobbies)}>
            <Text>🛒 New Hobbies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openPath(paths.reminders)}>
            <Text>🔔 Reminders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openPath(paths.farm)}>
            <Text>🌿 Visit Entling Farm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openPath(paths.taskling)}>
            <Text>🌼 Taskling</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openPath(paths.connect)}>
            <Text>💬 Connect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openPath(paths.wins)}>
            <Text>🏆 Wins</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openPath(paths.research)}>
            <Text>🔍 Research</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Home dashboard — only visible on Home */}
      {onHome && !menuVisible && (
        <View style={styles.contentBox}>
          <Text style={styles.tabTitle}>👋 Welcome to Auding You</Text>
          <Text style={styles.tabContent}>Choose what to focus on today:</Text>

          <TouchableOpacity style={styles.button} onPress={() => openPath(paths.taskling)}>
            <Text style={styles.buttonText}>🌼 Open Taskling</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => openPath(paths.farm)}>
            <Text style={styles.buttonText}>🌿 Go to Entling Farm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => openPath(paths.connect)}>
            <Text style={styles.buttonText}>💬 Open Connect</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => openPath(paths.brainwaker)}>
            <Text style={styles.buttonText}>🧩 Start Brain Waker</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2f7', padding: 20, paddingTop: 80 },
  topBar: { position: 'absolute', top: 40, left: 20 },
  menuIcon: { fontSize: 28 },
  welcome: { fontSize: 26, textAlign: 'center', marginBottom: 30 },
  menu: { marginBottom: 20 },
  menuItem: {
    padding: 12, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10,
  },
  contentBox: { backgroundColor: '#fff', borderRadius: 10, padding: 16 },
  tabTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  tabContent: { fontSize: 16, marginBottom: 20 },
  button: {
    padding: 14, backgroundColor: '#e2e8f0', borderRadius: 10, marginBottom: 12,
  },
  buttonText: { fontSize: 16, textAlign: 'center' },
});
