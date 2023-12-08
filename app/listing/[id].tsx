// Detail page component
import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import categoryImages from '../../components/categoryImages';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const auth = getAuth();
    const user = auth.currentUser;

    const findImageInfoById = (id: string) => {
        for (const category in categoryImages) {
            const imageInfo = categoryImages[category].find(info => info.id === id);
            if (imageInfo) return imageInfo;
        }
        return null;
    };


    const handleReserve = async () => {
        if (!user) {
            Alert.alert("Please log in.");
            console.log("User not logged in");
            return;
        }

        const imageInfo = findImageInfoById(id);

        if (imageInfo) {
            const reservationId = `${user.uid}_${imageInfo.id}`;
            const db = getFirestore();

            try {
                await setDoc(doc(db, "reservations", reservationId), {
                    email: user.email,
                    id: imageInfo.id,
                    uid: user.uid,
                });

                console.log('Reservation made:', reservationId);
                Alert.alert("Reservation successful!");
            } catch (error) {
                console.error("Error writing document: ", error);
                Alert.alert("Reservation failed. Please try again.");
            }
        } else {
            console.log('ImageInfo not found');
        }
    };

    const imageInfo = findImageInfoById(id);

    if (!imageInfo) {
        return <Text>Image not found</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={imageInfo.source} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{imageInfo.title}</Text>
                <Text style={styles.description}>{imageInfo.description}</Text>
            </View>
            <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
                <Text style={styles.reserveButtonText}>Reserve</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
    },
    reserveButton: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        padding: 10,
        backgroundColor: '#FF5733',
        borderRadius: 5,
    },
    reserveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default Page;
