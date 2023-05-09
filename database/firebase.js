import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7HwDolf66ZkEVsOT9aovB3VJaWcZF0XY",
  authDomain: "react-native-firebase-2a39a.firebaseapp.com",
  projectId: "react-native-firebase-2a39a",
  storageBucket: "react-native-firebase-2a39a.appspot.com",
  messagingSenderId: "381899962014",
  appId: "1:381899962014:web:7147bb99958f761d9c6d8f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};