import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6qzz4_eEuEhMvYlTmU_3FDNv4NLwLwJ8",
  authDomain: "rtkqueryfirebasecrud.firebaseapp.com",
  projectId: "rtkqueryfirebasecrud",
  storageBucket: "rtkqueryfirebasecrud.appspot.com",
  messagingSenderId: "277448548718",
  appId: "1:277448548718:web:2ff45f2ffe0e27bb39e17f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage=getStorage(app)