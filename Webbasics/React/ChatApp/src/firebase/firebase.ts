// Client-side Firebase initialization for the React app
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEJeUrVGxKOZH8uQFZpFzOgA2Eisp5t8g",
  authDomain: "userdb-c004c.firebaseapp.com",
  projectId: "userdb-c004c",
  storageBucket: "userdb-c004c.firebasestorage.app",
  messagingSenderId: "3500078196",
  appId: "1:3500078196:web:9192dd36b14f2b930ecd21",
  measurementId: "G-Z3D4K4XVDD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
