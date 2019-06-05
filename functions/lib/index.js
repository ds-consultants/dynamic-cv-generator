"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
    };
    return db.collection('users').doc(userId).set(data);
});
//# sourceMappingURL=index.js.map