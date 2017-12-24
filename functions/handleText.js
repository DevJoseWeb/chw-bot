'user strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const flow = require('./flow');
admin.initializeApp(functions.config().firebase);
const db = admin.database();
const fs = admin.firestore();

const handleText = (phoneId, input) => {
  const dbRef = db.ref('in_session/' + phoneId);
  var next;
  var step;

  return dbRef.once('value').then(snapshot => {
    const stepName = snapshot.val();
    // TODO handle not initialized
    step = steps[stepName];
    return fs.collection(...).document(...).set(step.transform(content))
      
  }).then(() => {
    next = step.next;
    return dbRef.set(next);
  }, err => {
    console.err('Error writing answer to Firestore', err);
    // TODO retry step
  }).then(() => {
    return next.question;
  });
};

module.exports = handleText;