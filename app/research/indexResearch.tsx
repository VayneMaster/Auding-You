import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { fetchResearchArticles } from "../../.expo/lib/fetchResearch";

export default function ResearchFeed() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadArticles = async () => {
    const data = await fetchResearchArticles();
    setArticles(data);
  };

  useEffect(() => {
    loadArticles().finally(() => setLoading(false));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadArticles();
    setRefreshing(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
      <Text>Loading articles...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item, i) => i.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.pubDate}</Text>
            <Text numberOfLines={3}>{item.contentSnippet}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
