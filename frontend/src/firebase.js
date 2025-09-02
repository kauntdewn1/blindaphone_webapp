import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "blindaphoneoficial.firebaseapp.com",
  projectId: "blindaphoneoficial",
  storageBucket: "blindaphoneoficial.appspot.com",
  messagingSenderId: "seu-sender-id",
  appId: "seu-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app; 