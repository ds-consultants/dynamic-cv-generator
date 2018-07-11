import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotifyService } from '../notify.service';

import { Observable } from 'rxjs/Observable';
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

        this.afs.firestore.settings({ timestampsInSnapshots: true });
        this.user = this.afAuth.authState
            .switchMap((user) => {
                if (user) {
                    this.userUid = user.uid;
                    return this.afs.doc<User>(`users/${this.userUid}`).valueChanges();
                } else {
                    return Observable.of(null);
                }
            });
    }

    //// Email/Password Auth ////
    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.userUid = user.uid;

                return user; // if using firestore
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

        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.userUid}`);

        const data = {
            name: user.name,
            title: user.title,
            experience: user.experience,
            education: user.education,
            skillset: user.skillset,
            professionalExpectations: user.professionalExpectations,
            personalNote: user.personalNote
        };

        return userRef.set(data);
    }
}
