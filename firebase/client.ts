// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJEYPQHJOy0Jm9qmSpQ4rfXLY2rU-3lMM",
    authDomain: "prepwise-553fe.firebaseapp.com",
    projectId: "prepwise-553fe",
    storageBucket: "prepwise-553fe.firebasestorage.app",
    messagingSenderId: "524409103883",
    appId: "1:524409103883:web:26ea75cb3c6dad808dc90e",
    measurementId: "G-J231SLS3TX"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);