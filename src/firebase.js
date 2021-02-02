import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD4Z1oy9d75cSUEBgb8Ar1vuVddv0KbHNI',
  authDomain: 'matek-gyakorlo.firebaseapp.com',
  projectId: 'matek-gyakorlo',
  storageBucket: 'matek-gyakorlo.appspot.com',
  messagingSenderId: '74290900992',
  appId: '1:74290900992:web:64837b1f0514116a2f68e5',
  measurementId: 'G-8YFCJ336VT',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
