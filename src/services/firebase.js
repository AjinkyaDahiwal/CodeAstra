import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtwXsUiMjX9aY7VR6WWNdq9DyxXpS3MP8",
  authDomain: "codeshastra-346e0.firebaseapp.com",
  projectId: "codeshastra-346e0",
  storageBucket: "codeshastra-346e0.firebasestorage.app",
  messagingSenderId: "530503688603",
  appId: "1:530503688603:web:59b856c11f224a0994413e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
