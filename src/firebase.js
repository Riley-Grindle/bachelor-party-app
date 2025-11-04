// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "bachelor-party-2026.firebaseapp.com",
  databaseURL: "https://bachelor-party-2026-default-rtdb.firebaseio.com",
  projectId: "bachelor-party-2026",
  storageBucket: "bachelor-party-2026.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database instance
export const db = getDatabase(app);

// Firebase Auth instance
export const auth = getAuth(app);

