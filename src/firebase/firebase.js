import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

export const myFirebase = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
const baseDb = myFirebase.firestore();
export const db = baseDb;
