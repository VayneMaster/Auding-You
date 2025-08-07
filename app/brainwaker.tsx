// app/Tabs/BrainWaker.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BrainWaker() {
  const [showAnswer, setShowAnswer] = useState(false);
  const puzzle = {
    question: 'What has keys but can’t open locks?',
    answer: 'A piano 🎹',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧩 Brain Waker</Text>
      <Text style={styles.question}>{puzzle.question}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowAnswer(true)}
        disabled={showAnswer}
      >
        <Text style={styles.buttonText}>
          {showAnswer ? `Answer: ${puzzle.answer}` : 'Reveal Answer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#eef2f7' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  question: { fontSize: 18, marginBottom: 12 },
  button: { backgroundColor: '#5A67D8', padding: 12, borderRadius: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});
