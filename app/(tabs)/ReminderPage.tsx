import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ReminderPage() {
    // Memory ofn user input
    const [input, setInput] = useState('');
    //memory of all reminders
    const [reminders, setReminders] = useState<string[]>([]);
    // add reminder
    const addReminder = () => { 
        if (input.trim() === '') return; //no empty
        setReminders([...reminders, input]);
        setInput('');
    };

    return (
        <View style={styles.container}>
        <Text style={styles.heading}>🔔 Reminders</Text>

        <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Remember that one thing?"
        style={styles.input}
        />

        <Button title="Add Reminder" onPress={addReminder} />

        <ScrollView style={{ marginTop: 20 }}>
            {reminders.map((reminder, index) => (
                <View key={index} style={styles.reminder}>
                    <Text>{reminder}</Text>
                </View>
            ))}
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {padding: 20, flex: 1 },
    heading: {fontSize: 24, marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    reminder: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginBottom: 8,
        borderRadius: 8,

    },
});