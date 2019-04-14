const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

const bot = {
  displayName: 'cleverBot',
  photoURL: 'https://i.imgur.com/ydOMC2c.png',
  uid: 'cleverBot',
  status: {
    lastChanged: new Date(),
    state: 'online'
  },
  channels: {
    general: true
  }
};

db.collection('users')
  .doc(bot.uid)
  .set(bot, { merge: true });

module.exports = functions.firestore
  .document('channels/general/messages/{messageId}')
  .onCreate((doc, context) => {
    const message = doc.data();

    if (!message.text.startsWith('@cleverbot')) return;

    return db.collection('channels/general/messages/').add({
      text: 'hey, whats up?',
      user: db.collection('users').doc('cleverBot'),
      createdAt: new Date()
    });
  });
