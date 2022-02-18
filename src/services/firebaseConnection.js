import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyCRY8sTkVxP0NYmtVGIcUqCtXa-0ARxBLQ",
  authDomain: "financas-54315.firebaseapp.com",
  projectId: "financas-54315",
  storageBucket: "financas-54315.appspot.com",
  messagingSenderId: "994566038149",
  appId: "1:994566038149:web:e574d68f821a1c11997fec"
  };

 if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
 }

 export default firebase;
