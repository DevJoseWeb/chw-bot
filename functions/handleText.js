'user strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const flow = require('./flow');
admin.initializeApp(functions.config().firebase);
const db = admin.database();
const fs = admin.firestore();

const handleText = (phoneId, input) => {
  var dbRef = db.ref('in_session/' + phoneId);
  var next;
  var step;

  return dbRef.once('value').then(snapshot => {
    var stepName = snapshot.val();
    if (!stepName) {
      stepName = flow.start;
    }
    // TODO handle not initialized
    // TODO build in mechanism to bypass first step
    step = flow.steps[stepName];
    var data = {};
    data[step.label] = step.transform(input);
    return fs.collection('patients').doc(phoneId).set(data, {merge: true})
  }).then(() => {
    next = step.next;
    return dbRef.set(next);
  }, err => {
    console.error('Error writing answer to Firestore', err);
    next = stepName; // repeat this step
    // TODO retry step
  }).then(() => {
    return flow.steps[next].question;
  });
};

module.exports = handleText;