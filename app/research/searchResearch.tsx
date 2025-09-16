import React, { useState } from "react";
import { Button, FlatList, Linking, Text, TextInput, TouchableOpacity, View } from "react-native";
import { searchADHDAndAutism } from "../lib/ducksearchengine";

export default function ResearchSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await searchADHDAndAutism(query);
    setResults(res);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Search ADHD/Autism research..."
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12 }}
      />
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={results}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
