import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

// Initalize and export Firebase.
var config = {
  apiKey: "AIzaSyCmnh4vuZQDr0cky79XfFlLe2vzk60wKps",
  authDomain: "putri-duyung-ancol.firebaseapp.com",
  databaseURL: "https://putri-duyung-ancol.firebaseio.com",
  projectId: "putri-duyung-ancol",
  storageBucket: "putri-duyung-ancol.appspot.com",
  messagingSenderId: "1030337441376"
};
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// export default firebase.initializeApp(config);
