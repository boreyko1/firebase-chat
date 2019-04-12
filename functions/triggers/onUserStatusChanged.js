const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

module.exports = functions.database
  .ref('status/{userId}')
  .onUpdate((change, context) => {
    const eventStatus = change.after.val();
    const userDoc = db.doc(`users/${context.params.userId}`);
    eventStatus.lastChanged = new Date(eventStatus.lastChanged);

    return change.after.ref.once('value').then(snapshot => {
      const status = snapshot.val();

      if (status.lastChanged > eventStatus.lastChanged) {
        return;
      }

      userDoc.update({
        status: eventStatus
      });
    });
  });
