// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCVHPM-37pmcQMixK2KioF98gjsRqQXZw",
    authDomain: "auth-5a8c4.firebaseapp.com",
    projectId: "auth-5a8c4",
    storageBucket: "auth-5a8c4.firebasestorage.app",
    messagingSenderId: "248162697613",
    appId: "1:248162697613:web:04e29c89c60957dc1b3dc4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

