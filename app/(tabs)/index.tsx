import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Taskling from '../features/Taskling';
import ConnectTab from './Connect';
import TaskFarmer from './Farm';

function BrainWaker() {
  const [showAnswer, setShowAnswer] = useState(false);

  const PUZZLE = {
    question: 'What has keys but can’t open locks?',
    answer: 'A piano 🎹',
  };

  return (
    <View style={styles.contentBox}>
      <Text style={styles.tabTitle}>🧩 Brain Waker</Text>
      <Text style={styles.tabContent}>{PUZZLE.question}</Text>

      <TouchableOpacity
        style={styles.revealButton}
        onPress={() => setShowAnswer(true)}
        disabled={showAnswer}
      >
        <Text style={styles.revealText}>
          {showAnswer ? `Answer: ${PUZZLE.answer}` : 'Reveal Answer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
    setMenuVisible(false);
  };

  const renderTabContent = () => {
    if (menuVisible) return null;
    switch (activeTab) {
      case 'brain':
        return <BrainWaker />;
      case 'taskling':
        return <Taskling />;
      case 'Connect':
        return <ConnectTab />;
      case 'Farm':
        return <TaskFarmer />;
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
            <Text style={styles.tabTitle}>🏆 Wins</Text>
            <Text style={styles.tabContent}>
              Share your wins with the community! Whether it's a small step or a big goal reached — it counts.
            </Text>
            <Text style={{ marginTop: 10, fontStyle: 'italic' }}>
              This will be a forum-like space in the future.
            </Text>
          </View>
        );

      default:
        return (
          <View style={styles.homeContainer}>
            <Text style={styles.title}>👋 Welcome to Auding You</Text>
            <Text style={styles.subtitle}>Choose what to focus on today:</Text>

            <TouchableOpacity style={styles.button} onPress={() => openTab('taskling')}>
              <Text style={styles.buttonText}>🌼 Open Taskling</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => openTab('Farm')}>
              <Text style={styles.buttonText}>🌿 Go to Entling Farm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => openTab('Connect')}>
              <Text style={styles.buttonText}>💬 Open Connect</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => openTab('brain')}>
              <Text style={styles.buttonText}>🧩 Start Brain Waker</Text>
            </TouchableOpacity>
          </View>
        );
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
      {!menuVisible && activeTab === null && (
      <Text style={styles.welcome}>Nice seeing you!</Text>
      )}

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
          <TouchableOpacity style={styles.menuItem} onPress={() => openTab('Farm')}>
            <Text>🌿 Visit Entling Farm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openTab('taskling')}>
            <Text>🌼 Taskling</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openTab('wins')}>
            <Text>🏆 Wins</Text>
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
  revealButton: {
    backgroundColor: '#5A67D8',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  revealText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // Added styles from Home.tsx
  homeContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    padding: 14,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
