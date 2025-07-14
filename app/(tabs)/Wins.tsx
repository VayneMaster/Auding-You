import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Win = {
    id: string;
    author: string;
    content: string;
    timestamp: number;
};

const STORAGE_KEY = ' communityWins';

export default function Wins() { 
    const [newWinText, setNewWinText] = useState('');
    const [globalWins, setGlobalWins] = useState<Win[]>([]);
//Load upon first render
    useEffect(() => {
        const loadWins = async () => {
            try {
                const json = await AsyncStorage.getItem(STORAGE_KEY);
                if (json) {
                    setGlobalWins(JSON.parse(json));
                }
            } catch (error) {
                console.error('Failed to retrieve wins:', error);
            }
        };
    loadWins();
    }, []);
//save changes to global
    useEffect(() => {
        const saveWins = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(globalWins));
            } catch (error) {
                console.error('Failed to save wins:', error);
            }
        };
        saveWins();
    }, [globalWins]);

    const postWin = () => {
        if (newWinText.trim() === '' ) return;
        const newWin: Win = {
            id: Date.now().toString(),
            author: 'You', //placehold rn
            content: newWinText.trim(),
            timestamp: Date.now(),
        };
        setGlobalWins([newWin, ...globalWins]);
        setNewWinText('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>✅Overview of wins!</Text>

            <TextInput
            style={styles.input}
            placeholder="Share your most recent win!"
            value={newWinText}
            onChangeText={setNewWinText}
            multiline
            />

            <TouchableOpacity style={styles.button} onPress={postWin}>
                <Text style={styles.buttonText}>Post your win here!</Text>
            </TouchableOpacity>

            <Text style={styles.subheading}>🌍 Community Wins</Text>

            <ScrollView style={styles.scrollArea}>
                {globalWins.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        No wins shared yet - share yours now 💪
                    </Text>
                ) : (
                    globalWins.map((win) => (
                        <View key={win.id} style={styles.winCard}>
                            <Text style={styles.author}>{win.author}</Text>
                            <Text style={styles.winText}>{win.content}</Text>
                            <Text style={styles.timestamp}>
                                {new Date(win.timestamp).toLocaleString()}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    minHeight: 60,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
  },
  scrollArea: {
    flex: 1,
  },
  winCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  winText: {
    fontSize: 16,
    marginBottom: 6,
  },
  timestamp: {
    fontSize: 10,
    color: 'gray',
    textAlign: 'right',
  },
});
