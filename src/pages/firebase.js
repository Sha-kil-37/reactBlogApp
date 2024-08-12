// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdd8E2_7lTgSWFZ1pAugheN7yPSxAZx4c",
  authDomain: "latest-app-1aa87.firebaseapp.com",
  projectId: "latest-app-1aa87",
  storageBucket: "latest-app-1aa87.appspot.com",
  messagingSenderId: "762586707699",
  appId: "1:762586707699:web:854bab8f1a01518cfa2986",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage( app );
const db = getFirestore(app);


export { auth, storage,db };
