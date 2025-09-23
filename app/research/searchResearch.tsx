import React, { useState } from "react";
import {
  Button,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { searchADHDAndAutism } from "../../.expo/lib/ducksearchengine";

export default function ResearchSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await searchADHDAndAutism(query);
    setResults(res.slice(0, 16)); //16 results
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search ADHD/Autism research..."
        placeholderTextColor="#666"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={results}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              {item.snippet ? (
                <Text style={styles.snippet}>{item.snippet}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White background so it's always readable
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#04f57c", 
    padding: 8,
    marginBottom: 12,
    borderRadius: 8,
    color: "#000", // Ensure typed text is visible
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222", // dark text
  },
  snippet: {
    marginTop: 4,
    fontSize: 14,
    color: "#555", // softer gray
  },
});
