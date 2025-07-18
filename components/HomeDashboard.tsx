import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeDashboard() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}> Welcome back!</Text>

            {/* Latest Win */}
            <View style={styles.card}>
                <Text style={styles.title}>🏆 Your Latest Victory!</Text>
                <Text style={styles.text}>
                    "Flowchart"
                </Text>
                <TouchableOpacity>
                    <Text style={styles.link}>View all wins.</Text>
                </TouchableOpacity>
            </View>

            {/* Suggested Content */}
            <View style={styles.card}>
                <Text style={styles.title}>🎯 For You</Text>
                <Text style={styles.text}>
                    "How to handle stress"
                </Text>
                <TouchableOpacity>
                    <Text style={styles.link}>Read more...</Text>
                </TouchableOpacity>
            </View>

            {/* Entling Progress */}
            <View style={styles.card}>
                <Text style={styles.title}>🌱 Entling Progress</Text>
                <Text style={styles.text}> 2 out of 3 tasks completed today!</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '66%' }]} />
                    </View>
                    <TouchableOpacity></TouchableOpacity>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 2.
    },
    title: {fontSize: 18, fontWeight: '600', marginBottom: 6},
    text: { fontSize: 16, marginBottom: 8},
    link: {color: '#5A67D8', fontWeight: '500'},
    progressBar: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 4,
        marginBottom: 10,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#5A67D8',
    },
});