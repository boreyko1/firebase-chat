import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyA0qq_78HqWzPoAbckL2pTVPJfN7hEgtC8',
  authDomain: 'chat-app-cd0e6.firebaseapp.com',
  databaseURL: 'https://chat-app-cd0e6.firebaseio.com',
  projectId: 'chat-app-cd0e6',
  storageBucket: 'chat-app-cd0e6.appspot.com',
  messagingSenderId: '463300803073'
};

firebase.initializeApp(config);

export const db = firebase.firestore();
