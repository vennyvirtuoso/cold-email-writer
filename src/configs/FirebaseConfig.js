import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDG0t33MQlhYz2h_55K9cm6o0_xU275FoE",
  authDomain: "cold-email-writer-1e2ba.firebaseapp.com",
  projectId: "cold-email-writer-1e2ba",
  storageBucket: "cold-email-writer-1e2ba.appspot.com",
  messagingSenderId: "681517354527",
  appId: "1:681517354527:web:f36b424177667af62f8f2a",
  measurementId: "G-4QGDWJBKPD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
