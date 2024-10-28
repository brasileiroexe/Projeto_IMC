// Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqhD8rLWVkGCtz0dxwn9U-LVNnlZkBy5s",
  authDomain: "imc-teste-cc428.firebaseapp.com",
  projectId: "imc-teste-cc428",
  storageBucket: "imc-teste-cc428.appspot.com",
  messagingSenderId: "979560157862",
  appId: "1:979560157862:web:d4133747b47843e6c2da67",
  measurementId: "G-E90GXTW1Z1",
};

// Inicializando o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializando Firestore e Auth
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Exportando os serviços Firebase
export { db, auth };
