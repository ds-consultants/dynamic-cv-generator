import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.initUserInCloudDb = functions.auth.user().onCreate((user) => {
  console.log('INIT USER IN DB');
  console.log(user);
  const userId = user.uid;
  const db = admin.firestore();

  const data = {
    education: [],
    experience: [],
    skillset: {
      languages: {
        main: [],
        second: []
      },
      others: {
        main: [],
        second: []
      }
    },
    name: '',
    personalNote: '',
    professionalExpectations: '',
    title: '',
    uid: userId,
    email: user.email
  }

  return db.collection('users').doc(userId).set(data);
});
