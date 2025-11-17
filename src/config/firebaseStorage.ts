// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firestore setup
const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  BUCKET,
  SENDER_ID,
  APP_ID,
  MEAUREMENT_ID,
} = process.env;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY as string,
  authDomain: AUTH_DOMAIN as string,
  projectId: PROJECT_ID as string,
  storageBucket: BUCKET as string,
  messagingSenderId: SENDER_ID as string,
  appId: APP_ID as string,
  measurementId: MEAUREMENT_ID as string, // optional
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getStorage(firebaseApp);
// const analytics = getAnalytics(firebaseApp);
