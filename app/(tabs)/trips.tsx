import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import categoryImages from '../../components/categoryImages'; // Adjust the path as needed

interface TripInfo {
  id: string;
  imageUrl: any; // Local require for image source
  email: string; // Email without domain part
  // Add more fields if necessary
}

const Trips = () => {
  const [trips, setTrips] = useState<TripInfo[]>([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        fetchTrips(user.uid);
      } else {
        setTrips([]); // Clear trips when user logs out
      }
    });

    return () => unsubscribe(); // Unsubscribe on component unmount
  }, [auth]);

  const fetchTrips = async (uid: string) => {
    const q = query(collection(db, "reservations"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const fetchedTrips = querySnapshot.docs.map(doc => {
      const data = doc.data();
      let imageUrl = null;
      for (const category in categoryImages) {
        const imageInfo = categoryImages[category].find(info => info.id === data.id); // Match by imageId from Firestore
        if (imageInfo) {
          imageUrl = imageInfo.source; // Retrieve the source URL from categoryImages
          console.log("Image found for ID:", data.imageId); // Debug log
          break;
        }
      }

      if (!imageUrl) {
        console.log("No image found for ID:", data.imageId); // Debug log
      }

      return {
        id: doc.id,
        imageUrl,
        email: data.email.split('@')[0] // Assuming email is a field in the document, split to remove domain
      };
    });
    setTrips(fetchedTrips);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.heading}>Upcoming Reservations</Text>
      {trips.map((trip, index) => (
        <View key={index} style={styles.card}>
          {trip.imageUrl && <Image source={trip.imageUrl} style={styles.image} />}
          <Text style={styles.email}>User: {trip.email}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 10,
    height: 250,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  email: {
    margin: 10,
    fontSize: 22,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },

});

export default Trips;
