import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Inbox() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Inbox</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
    },
});
