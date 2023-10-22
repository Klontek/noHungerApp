// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import {initializeApp} from "firebase/app"; 
// import {getAuth} from "firebase/auth";
// import {getFirestore} from "firebase/firestore"


import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// web app firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHeyRA7Z0nlLxBDUaljM3bKspcDXJE7Fo",
  authDomain: "nohungerapp-722db.firebaseapp.com",
  projectId: "nohungerapp-722db",
  storageBucket: "nohungerapp-722db.appspot.com",
  messagingSenderId: "352625769511",
  appId: "1:352625769511:web:f7f86a3e69493a59812202",
  measurementId: "G-TN8WV7EE5M"
};


// Initialize Firebase with AsyncStorage for Auth persistence
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Export Firebase instances
export const FIREBASE_APP = app;
export const FIREBASE_AUTH = auth;
export const FIREBASE_DB = getFirestore(app);












// export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
// export const FIREBASE_DB = getFirestore(FIREBASE_APP)



// // Initialize Firebase
// let firebaseApp;

// if (firebase.apps.length === 0) {
//   firebaseApp = firebase.initializeApp(firebaseConfig);
//   console.log("Firebase initialized");
// } else {
//   firebaseApp = firebase.app();
//   console.log("Firebase already initialized");
// }

// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();  // Make sure auth is a function

// export { auth, db };
// export default firebaseApp;
