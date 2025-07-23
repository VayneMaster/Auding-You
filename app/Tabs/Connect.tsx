// ConnectTab.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type User = {
  name: string;
  interests: string[];
  lonely: boolean;
};

type RootStackParamList = {
  Connect: undefined;
  Chat: { user: User };
};

type ConnectScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Connect'
  >;



// Mock user profile (should be dynamic in real app)
const currentUser = {
  name: 'You',
  interests: ['music', 'food', 'coding'],
  lonely: true,
};

// Mock other users
const otherUsers = [
  { name: 'Nomi', interests: ['food', 'travel'], lonely: false },
  { name: 'Alex', interests: ['music', 'coding'], lonely: true },
  { name: 'Jamie', interests: ['art', 'hiking'], lonely: false },
  { name: 'Sasha', interests: ['food', 'music'], lonely: true },
];

// Matching algorithm
function findBestMatch() {
  const scores = otherUsers.map((user) => {
    const shared = user.interests.filter((i) => currentUser.interests.includes(i));
    const score = shared.length + (user.lonely ? 1 : 0); // Add 1 if they're lonely
    return { user, score };
  });

  scores.sort((a, b) => b.score - a.score);
  return scores[0]?.user || null;
}

export default function ConnectTab() {
  const navigation = useNavigation<ConnectScreenNavigationProp>();
  const [isConnecting, setIsConnecting] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);

  const startMatching = () => {
    setIsConnecting(true);
    setMatchedUser(null);

    setTimeout(() => {
      const match = findBestMatch();
      setMatchedUser(match);
      setIsConnecting(false);
    }, 2500);
  };

  const goToChat = () => {
    navigation.navigate('Chat', { user: matchedUser! });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🫂 Auding Together</Text>

      {isConnecting ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : matchedUser ? (
        <View>
          <Text style={styles.content}>🎉 Matched with <Text style={styles.bold}>{matchedUser.name}</Text></Text>
          <Text style={styles.content}>Shared interests: {matchedUser.interests.join(', ')}</Text>

          <TouchableOpacity style={styles.button} onPress={goToChat}>
            <Text style={styles.buttonText}>Open Chat</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={startMatching}>
          <Text style={styles.buttonText}>Find Someone to Talk To</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.subtext}>No swiping. Just meaningful matches.</Text>
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
    marginTop: 10,
  },
  buttonText: { color: 'white', fontWeight: '600' },
});
