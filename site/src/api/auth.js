import Firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC3oPixDcIOnfima5ZiYPtTTKizfIO5Qh8",
  authDomain: "on-it-app.firebaseapp.com",
  databaseURL: "https://on-it-app.firebaseio.com",
  projectId: "on-it-app",
  storageBucket: "on-it-app.appspot.com",
  messagingSenderId: "583691553475",
  appId: "1:583691553475:web:5cb3be3dcb0e691ea27076",
  measurementId: "G-GY7H18GCYM"
};

Firebase.initializeApp(config);

const auth = Firebase.auth();

export default auth;
