import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqn1nEPSt8DnpaJcTO8CR7daL9IYSchw4",
  authDomain: "olx-clone-fd650.firebaseapp.com",
  projectId: "olx-clone-fd650",
  storageBucket: "olx-clone-fd650.firebasestorage.app",
  messagingSenderId: "112305245900",
  appId: "1:112305245900:web:092e6ece2b0b6e56c9fc69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Google Authentication Provider
export const googleProvider = new GoogleAuthProvider();

// Firestore Database
export const db = getFirestore(app);

// Firebase Storage
export const storage = getStorage(app);

export default app;