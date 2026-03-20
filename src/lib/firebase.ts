import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBCCRuXyyVaYdpWXo-Mw1lT1oisPdsxUCY",
  authDomain: "hackbro-f307d.firebaseapp.com",
  projectId: "hackbro-f307d",
  storageBucket: "hackbro-f307d.firebasestorage.app",
  messagingSenderId: "716666739822",
  appId: "1:716666739822:web:a23355027029f501b59a7f",
  measurementId: "G-1CHD2TXPGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const googleProvider = new GoogleAuthProvider();

export { 
  app, 
  auth, 
  analytics, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
};
export type { User };
