import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null); //tracks open tab

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
    setMenuVisible(false); // auto closes menu
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'brain':
        return (
          <View style={styles.contentBox}>
            <Text style={styles.tabTitle}>🧩 Brain Waker</Text>
            <Text style={styles.tabContent}>Heres a puzzle</Text>
            <Text style={{marginTop: 10, fontStyle: 'italic'}}> Tap to reveal answer</Text>
          </View>
        );
        case 'hobbies':
          return (
            <View style={styles.contentBox}>
              <Text style={styles.tabTitle}>🛒 New Hobbies</Text>
              <Text style={styles.tabContent}>Will it be your new hobby, or not yet?</Text>
            </View>
          );
          case 'reminders':
            return (
              <View style={styles.contentBox}>
                <Text style={styles.tabTitle}>🔔 Reminders</Text>
                <Text style={styles.tabContent}>Set a reminder here.</Text>
              </View>
            );
            case 'wins':
              return (
                <View style={styles.contentBox}>
                  <Text style={styles.tabTitle}>✅ Wins</Text>
                  <Text style={styles.tabContent}>Each win is one step closer!</Text>
                  </View>
              );
              default:
              return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* ☰ Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome message */}
      <Text style={styles.welcome}>Nice seeing you!</Text>

      {/* Menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => openTab('brain')}>
            <Text>🧩 Brain Waker</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openTab('hobbies')}>
            <Text>🛒 New Hobbies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openTab('reminders')}>
            <Text>🔔 Reminders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openTab('wins')}>
            <Text>✅ Wins</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tab content */}
      {renderTabContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f7',
    padding: 20,
    paddingTop: 80,
  },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  menuIcon: {
    fontSize: 28,
  },
  welcome: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 30,
  },
  menu: {
    marginBottom: 20,
  },
  menuItem: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  contentBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tabContent: {
    fontSize: 16,
  },
});