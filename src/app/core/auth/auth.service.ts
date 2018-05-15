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

    constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        public notify: NotifyService) {

        this.afs.firestore.settings({ timestampsInSnapshots: true });
        this.user = this.afAuth.authState
            .switchMap((user) => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return Observable.of(null);
                }
            });
    }

    //// Email/Password Auth ////
    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                return this.updateUserData(user); // if using firestore
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

        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data = {
            uid: '',
            email: null,
            name: 'Karol Lewandowski',
            title: 'AEM Developer',
            experience: [
                {
                    'company': 'Dynamic Solutions',
                    'time': '2014-present',
                    'position': 'Java and AEM Consultant',
                    'projects': [
                        {
                            'name': 'Ryanair',
                            'title': 'AEM Developer',
                            'desc': 'Work on CMS (Adobe Experience Manager) for ryanair.com website.',
                            'technologies': ['AEM', 'HTL', 'JSP', 'HTML', 'CSS', 'JavaScript', 'JUnit', 'Mockito', 'AssertJ']
                        },
                        {
                            'name': 'Roche',
                            'title': 'Senior Java Developer',
                            'desc': 'Development of web API consumed by AngularJS frontend module in application supporting employees competencies development.',
                            'technologies': ['Java', 'Spring', 'JUnit', 'Mockito', 'AssertJ']
                        },
                        {
                            'name': 'Roche',
                            'title': 'Developer',
                            'desc': 'Development of animated Windows Sidebar gadget giving hints about corporation procedures.',
                            'technologies': ['JavaScript', 'HTML', 'CSS']
                        },
                        {
                            'name': 'Roche',
                            'title': 'Senior Java Developer',
                            'desc': 'Work on web application supporting drugs development.',
                            'technologies': ['Java', 'Spring', 'JSF', 'JUnit', 'Mockito', 'AssertJ']
                        }
                    ]
                },
                {
                    'company': 'eo Networks S.A.',
                    'time': '2010-2014',
                    'position': 'Java Developer',
                    'mainProjects': [
                        {
                            'desc': 'Work on one of Europe\'s leading B2B/B2C parcel delivery company\'s (DPD) ERP system.',
                            'technologies': ['Java', 'GWT', 'TestNG', 'Mockito']
                        },
                        {
                            'desc': 'Outsourced to one of the biggest Polish e-commerce companies - merlin.pl.',
                            'technologies': ['Java', 'JavaScript', 'Spring', 'Hibernate']
                        },
                        {
                            'desc': 'Work on web applications (taxi ordering, invoicing, reporting) of direct taxi ordering system.',
                            'technologies': ['Java', 'JavaScript', 'Freemarker', 'Spring', 'JUnit', 'Mockito']
                        },
                        {
                            'desc': 'Work on the leading Polish car insurance comparison and sales website - rankomat.pl.',
                            'technologies': ['Java', 'JBoss SEAM', 'JPA', 'Hibernate', 'EJB', 'JSF', 'Spring', 'TestNG', 'JUnit', 'Maven', 'Ant', 'JBoss AS']
                        },
                        {
                            'desc': 'Work on insurance calculators\' frontend application used by insurance agents at Aviva.',
                            'technologies': ['Java', 'GWT', 'Tomcat', 'Maven']
                        }
                    ]
                }
            ],
            education: [
                {
                    'place': 'Białystok University of  Technology',
                    'time': '2005-2010',
                    'name': 'Master of Engineering (MSEng), Information Technologies',
                    'namePlace': 'Białystok'
                }
            ],
            professionalExpectations: 'Karol likes to learn and use technologies which solve problems in simple and clear way. Ideally his role is a senior development specialist with full responsibility for software produced by him.',
            personalNote: 'Programming is ones of my hobbies, so I constantly learn new technologies. In spare time I ride my bike, enjoy craft beers and contribute to open source projects.',
            skillset: {
                    'languages': {
                        'main': ['Java', 'Kotlin', 'JavaScript', 'SQL'],
                        'second': ['HTML', 'CSS', 'SASS', 'LESS']
                    },
                'others': {
                    'main': ['AEM', 'HTL', 'JSP', 'Spring', 'Java Servlets', 'JUnit', 'TestNG', 'Mockito', 'AssertJ', 'JPA', 'Hibernate', 'Gradle', 'Maven', 'IntelliJ IDEA'],
                    'second': ['jQuery', 'AngularJS', 'React', 'Gulp', 'Grunt', 'Git', 'Jira', 'Stash', 'Scrum']
                }
            }
        };
        return userRef.set(data);
    }
}
