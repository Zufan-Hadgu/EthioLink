// fierbase.js

// New Modular Imports (V9+)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc,
    collection, 
    addDoc 
} from "firebase/firestore";

// 🟢 CORRECT STORAGE IMPORTS
import { 
    getStorage,       // Function to initialize Storage
    ref,              // Function for creating references
    uploadBytes,      // Function for uploading files
    getDownloadURL    // Function for getting the URL
} from "firebase/storage"; 


// Your web app's Firebase configuration
const firebaseConfig = {
    // ... your config details
    apiKey: "AIzaSyDTGBz5DrTFvu97nbh3WUt9KnueDK8MC_A",
    authDomain: "ethiolink-abd47.firebaseapp.com",
    projectId: "ethiolink-abd47",
    storageBucket: "ethiolink-abd47.firebasestorage.app",
    messagingSenderId: "714526820876",
    appId: "1:714526820876:web:91d74d8ed5ee8c53ac3c29",
    measurementId: "G-QHGPX279B6"
};

// 1. Initialize Firebase using the imported function
const app = initializeApp(firebaseConfig);

// 2. Initialize the services using the imported getter functions
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // Get Firestore instance
// 🟢 Initialize and export Storage
export const storage = getStorage(app); 


// 3. Export any other functions you need
export { 
    // Auth
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    
    // Firestore
    doc, 
    setDoc, 
    getDoc,
    collection, 
    addDoc,
    
    // 🟢 Storage
    ref, 
    uploadBytes, 
    getDownloadURL 
};