import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

//filled as view
const mockResults = [
    {
        title: '123',
        snippet: '5677',
        link: 'https://google.com'
    },
    {
        title: '34454',
        snippet: '5367',
        link: 'https://youtube.com',
    },
];

export default function Research() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<typeof mockResults>([]);

    const searchResearch = () => {
        setLoading(true);

        //fake loading
        setTimeout(() => {
            setResults(mockResults);
            setLoading(false);
        }, 1500);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔍 Dig into the Abyss</Text>
            <Text style={styles.subtitle}>Search for the latest on AUDHD</Text>

            <TextInput
            style={styles.input}
            placeholder='Search topic...'
            value={query}
            onChangeText={setQuery}
            />

            <TouchableOpacity style={styles.button} onPress={searchResearch}>
                <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        <ScrollView style={styles.results}>
          {results.map((res, index) => (
            <View key={index} style={styles.resultItem}>
              <Text style={styles.resultTitle}>{res.title}</Text>
              <Text style={styles.resultSnippet}>{res.snippet}</Text>
              <Text style={styles.resultLink}>{res.link}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#eef2f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5A67D8',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  results: {
    marginTop: 10,
  },
  resultItem: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  resultTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultSnippet: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  resultLink: {
    fontSize: 12,
    color: 'blue',
    marginTop: 4,
  },
});