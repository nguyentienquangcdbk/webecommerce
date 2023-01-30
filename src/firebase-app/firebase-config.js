import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuy2peaU6pu_coNvAslCePEj06vzVJu_U",
  authDomain: "shopping-b21a7.firebaseapp.com",
  projectId: "shopping-b21a7",
  storageBucket: "shopping-b21a7.appspot.com",
  messagingSenderId: "278775894259",
  appId: "1:278775894259:web:47b2c0c627f5c1fba72786",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
