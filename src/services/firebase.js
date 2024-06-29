import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "book-talk-8da03.firebaseapp.com",

  projectId: "book-talk-8da03",

  storageBucket: "book-talk-8da03.appspot.com",

  messagingSenderId: "996135691599",

  appId: "1:996135691599:web:16177c2d5567534f98913a",
};

export const app = initializeApp(firebaseConfig);
