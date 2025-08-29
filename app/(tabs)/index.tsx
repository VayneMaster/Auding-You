// app/(tabs)/index.tsx
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { paths } from "../constants/routes";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏠 Home Dashboard</Text>

      {/* Quick links */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(paths.connect)}
      >
        <Text style={styles.buttonText}>💬 Go to Connect</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(paths.farm)}
      >
        <Text style={styles.buttonText}>🌿 Go to Entling Farm</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(paths.research)}
      >
        <Text style={styles.buttonText}>🔬 Go to Research</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(paths.brainwaker)}
      >
        <Text style={styles.buttonText}>🧩 Play Brain Waker</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(paths.taskling)}
      >
        <Text style={styles.buttonText}>📝 Open Taskling</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(paths.wins)}
      >
        <Text style={styles.buttonText}>🏆 View Wins</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(paths.hobbies)}
      >
        <Text style={styles.buttonText}>🎨 Explore Hobbies</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(paths.reminders)}
      >
        <Text style={styles.buttonText}>⏰ Check Reminders</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#eef2f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#5A67D8",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    width: "90%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
