import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConnectTab() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [matchedUser, setMatchedUser] = useState<{ name: string; interest: string } | null>(null);

  const startMatching = () => {
    setIsConnecting(true);
    setMatchedUser(null);

    // Simulate finding a match
    setTimeout(() => {
      setMatchedUser({
        name: 'Nomi',
        interest: 'food',
      });
      setIsConnecting(false);
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🫂 Auding Together</Text>

      {isConnecting ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : matchedUser ? (
        <View>
          <Text style={styles.content}>🎉 You’ve been matched with: <Text style={styles.bold}>{matchedUser.name}</Text></Text>
          <Text style={styles.content}>Shared interest: {matchedUser.interest}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={startMatching}>
          <Text style={styles.buttonText}>Find Someone to Talk To</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.subtext}>Share experiences and ideas freely.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#eef2f7', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  content: { fontSize: 16, marginBottom: 10 },
  subtext: { fontSize: 14, fontStyle: 'italic', marginTop: 20, color: '#666' },
  bold: { fontWeight: 'bold' },
  button: {
    backgroundColor: '#5A67D8',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: '600' },
});
