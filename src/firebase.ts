// // src/firebase.ts
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBg9c9ZdAjhS84V9PpHo-EY6aVCDLdJWU0",
//   authDomain: "vk-copy-3e666.firebaseapp.com",
//   projectId: "vk-copy-3e666",
//   storageBucket: "vk-copy-3e666.firebasestorage.app",
//   messagingSenderId: "914513585073",
//   appId: "1:914513585073:web:ff8451e1d9e39863bad390"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);




// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Добавляем Auth

const firebaseConfig = {
  apiKey: "AIzaSyBg9c9ZdAjhS84V9PpHo-EY6aVCDLdJWU0",
  authDomain: "vk-copy-3e666.firebaseapp.com",
  projectId: "vk-copy-3e666",
  storageBucket: "vk-copy-3e666.firebasestorage.app",
  messagingSenderId: "914513585073",
  appId: "1:914513585073:web:ff8451e1d9e39863bad390"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Экспортируем auth
export { app };