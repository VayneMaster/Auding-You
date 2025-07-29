import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HomeProps {
  openTab: (tabName: string) => void;
}

export default function Home({ openTab }: HomeProps) {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', borderRadius: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 16, marginBottom: 20 },
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
