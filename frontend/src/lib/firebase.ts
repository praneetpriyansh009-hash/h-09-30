import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACZhf1s_1K1T2hCb5OWiOpg0z7EezwjcY",
  authDomain: "hookin-f9170.firebaseapp.com",
  projectId: "hookin-f9170",
  storageBucket: "hookin-f9170.firebasestorage.app",
  messagingSenderId: "609717693341",
  appId: "1:609717693341:web:b326fae9e0f2b9442fdd74",
  measurementId: "G-NT81N031MS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (Only runs in browser environments)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export { app, analytics };
