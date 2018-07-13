"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.initUserInCloudDb = functions.auth.user().onCreate((user) => {
    admin.initializeApp();
    const userId = user.uid;
    const db = admin.firestore();
    const data = {
        education: [],
        experience: [],
        skillset: {},
        name: '',
        personalNote: '',
        professionalExpectations: '',
        title: '',
        uid: userId,
        email: user.email
    };
    return db.collection('users').doc(userId).set(data);
});
