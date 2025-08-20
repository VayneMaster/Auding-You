// app/hobbies.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Hobbies() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⭐ Hobbies (placeholder)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eef2f7' },
  text: { fontSize: 18 },
});
