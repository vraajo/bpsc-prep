import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsvS4K4zJwySlsrJYZYMsA2jd3Gy0doZA",
  authDomain: "bpsc-prep-3701f.firebaseapp.com",
  projectId: "bpsc-prep-3701f",
  storageBucket: "bpsc-prep-3701f.firebasestorage.app",
  messagingSenderId: "452261924336",
  appId: "1:452261924336:web:a76246f3be64d639d62135",
  measurementId: "G-1Q3ZBHKMFD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, doc, getDoc, setDoc, updateDoc, onSnapshot };
