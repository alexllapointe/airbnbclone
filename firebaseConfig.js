import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
    apiKey: 'AIzaSyC_feAVd1SvnnwuECj1wsbkLFx0L8NZ-PA',
    authDomain: 'airbnbclone-b55c5.firebaseapp.com',
    databaseURL: 'https://airbnbclone-b55c5.firebaseio.com',
    projectId: 'airbnbclone-b55c5',
    storageBucket: 'airbnbclone-b55c5.appspot.com',
    messagingSenderId: '980673614017',
    appId: '1:980673614017:android:9466739cd61a36cea44440',
    measurementId: 'G-measurement-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const storage = getStorage(app);
const firestore = getFirestore(app);

export { auth, storage, firestore };
