import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA0qq_78HqWzPoAbckL2pTVPJfN7hEgtC8',
  authDomain: 'chat-app-cd0e6.firebaseapp.com',
  databaseURL: 'https://chat-app-cd0e6.firebaseio.com',
  projectId: 'chat-app-cd0e6',
  storageBucket: 'chat-app-cd0e6.appspot.com',
  messagingSenderId: '463300803073'
};

firebase.initializeApp(config);

const db = firebase.firestore();
const rtdb = firebase.database();

function setupPresence(user) {
  const isOfflineRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOfflineFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOnlineFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const RTDBref = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`users/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineFirestore
      });
      return;
    }

    await RTDBref.onDisconnect().set(isOfflineRTDB);
    RTDBref.set(isOnlineRTDB);
    userDoc.update({
      status: isOnlineFirestore
    });
  });
}

export { db, firebase, setupPresence };
