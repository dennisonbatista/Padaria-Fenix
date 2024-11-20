// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEHzyG-OjXftzqMbJcguE-e-h2o-7J0Lc",
  authDomain: "padaria-fenix-467a3.firebaseapp.com",
  databaseURL: "https://padaria-fenix-467a3-default-rtdb.firebaseio.com",
  projectId: "padaria-fenix-467a3",
  storageBucket: "padaria-fenix-467a3.firebasestorage.app",
  messagingSenderId: "163105146119",
  appId: "1:163105146119:web:2d250d5033da8ccb3071a2",
  measurementId: "G-G9FLKHF1JQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const environment = {
  production: false,
  firebaseConfig: {
    // Configurações do Firebase
  }
};
