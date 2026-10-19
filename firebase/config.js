import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
      apiKey: "AIzaSyDn8qfYSOWytR8s06EcOCePSZ7eoiaOxYQ",
  authDomain: "tiendavirtual2-ec332.firebaseapp.com",
  projectId: "tiendavirtual2-ec332",
  storageBucket: "tiendavirtual2-ec332.firebasestorage.app",
  messagingSenderId: "767894634113",
  appId: "1:767894634113:web:7b4c5e20849466ca1e1780",
};

const app = initializeApp(config);

export const db = getFirestore(app);