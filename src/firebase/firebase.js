// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0xJIMMw-JBhf4cbDgqlo0Aj5lPa9DLZA",
  authDomain: "labour-management-system-2367e.firebaseapp.com",
  projectId: "labour-management-system-2367e",
  storageBucket: "labour-management-system-2367e.firebasestorage.app",
  messagingSenderId: "405906853205",
  appId: "1:405906853205:web:56135148ed374d579833dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);