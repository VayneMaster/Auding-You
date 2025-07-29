import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AudingYouTab() {
  const [mood, setMood] = useState('🙂');
  const [overwhelm, setOverwhelm] = useState(3);
  const [mentalLoad, setMentalLoad] = useState('');
  const [mentalNotes, setMentalNotes] = useState<string[]>([]);
  const [intent, setIntent] = useState('');

  const handleAddNote = () => {
    if (mentalLoad.trim()) {
      setMentalNotes([...mentalNotes, mentalLoad.trim()]);
      setMentalLoad('');
    }
  };

  const handleReset = () => {
    Alert.alert('🪺 Reset', 'You are enough. Take a breath.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🧠 Auding You</Text>

      <View style={styles.card}>
        <Text style={styles.label}>How are you feeling today?</Text>
        <Text style={styles.bigEmoji}>{mood}</Text>
        <View style={styles.emojiRow}>
          {['😞', '😐', '🙂', '😊', '😄'].map((emoji) => (
            <TouchableOpacity key={emoji} onPress={() => setMood(emoji)}>
              <Text style={styles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Mental Load</Text>
        <TextInput
          style={styles.input}
          value={mentalLoad}
          onChangeText={setMentalLoad}
          placeholder="Something on your mind..."
          onSubmitEditing={handleAddNote}
        />
        {mentalNotes.map((note, i) => (
          <Text key={i} style={styles.noteItem}>• {note}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>What would make today okay?</Text>
        <TextInput
          style={styles.input}
          value={intent}
          onChangeText={setIntent}
          placeholder="An intention, wish, or goal..."
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>🪺 I need a reset</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff9f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  bigEmoji: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 8,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  emoji: {
    fontSize: 28,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  noteItem: {
    marginTop: 8,
    fontSize: 15,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#d6e4ff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 30,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
