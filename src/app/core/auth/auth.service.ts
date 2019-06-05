import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NotifyService } from '../notify.service';

import { Observable ,  of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../../user';

@Injectable()
export class AuthService {

    user: Observable<User | null>;
    userUid: string | '';

    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        public notify: NotifyService) {

        this.user = this.afAuth.authState.pipe(
          switchMap((user) => {
              if (user) {
                  this.userUid = user.uid;
                  return this.afs.doc<User>(`users/${this.userUid}`).valueChanges();
              } else {
                  return of(null);
              }
          })
        );
    }

    //// Email/Password Auth ////
    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                this.userUid = userCredentials.user.uid;

                return userCredentials.user; // if using firestore
            })
            .catch((error) => this.handleError(error));
    }

    emailLogin(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                // console.log(Object.prototype.toString.call(user));
                return user; // if using firestore
            });
    }

    addNewUser(email: string, password: string) {
          const secondaryApp = firebase.apps[1] || firebase.initializeApp(environment.firebase, 'Secondary');

          return secondaryApp.auth().createUserWithEmailAndPassword(email, password)
              .then(userResponse => {
                console.log(userResponse)
                secondaryApp.auth().signOut();
                return true;
              })
              .catch((error) => {
                this.handleError(error);
                return false;
              });
      }

    // Sends email allowing user to reset password
    resetPassword(email: string) {
        const fbAuth = firebase.auth();

        return fbAuth.sendPasswordResetEmail(email)
            .then(() => this.notify.update('Password update email sent'))
            .catch((error) => this.handleError(error));
    }

    // If error, console log and notify user
    private handleError(error: Error) {
      this.notify.update(error.message);
    }

    // Sets user data to firestore after succesful login
    public updateUserData(user: User) {

        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data = {
            name: user.name,
            title: user.title,
            experience: user.experience,
            education: user.education,
            skillset: user.skillset,
            professionalExpectations: user.professionalExpectations,
            personalNote: user.personalNote,
            superUser: user.superUser || false,
            uid: user.uid,
            email: user.email || '',
            photoUrl: user.photoUrl || ''
        };

        return userRef.set(data);
    }
}
