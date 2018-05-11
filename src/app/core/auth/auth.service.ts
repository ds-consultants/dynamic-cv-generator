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
            name: 'Dawid Kozak',
            title: 'Senior Front-end Developer',
            experience: [
                {
                    'company': 'Dynamic Solutions',
                    'time': '2017-present',
                    'position': 'Senior Front-end Consultant',
                    'mainProjects': [
                        {
                            'desc': 'Responsible for developing new functionalities, refactoring and bug fixing of a tool for sharing BIM models online - BIMer',
                            'technologies': [
                                'Sling', 'ClientLibs', 'HTML', 'CSS', 'Three.js', 'Maven'
                            ]
                        }
                    ],
                    'projects': [
                        {
                            'name': 'Hewlett Packard Enterprises',
                            'title': 'Front-end Consultant',
                            'desc': 'Responsible for front-end development on a MentorMe Project.It\'s a mobile application used on universities in Mexico that connects people that wish to teach (Mentors) and those wish to learn (Mentee).',
                            'technologies': [
                                'Angular4', 'Ionic3', 'JavaScript', 'HTML', 'CSS', 'SASS'
                            ]
                        },
                        {
                            'name': 'Netcentric',
                            'title': 'Front-end Consultant',
                            'desc': 'Responsible for creation and development search application used by PostFinance.',
                            'technologies': [
                                'JavaScript', 'ES6', 'HTML', 'CSS'
                            ]
                        },
                        {
                            'name': 'Netcentric',
                            'title': 'Front-end Consultant',
                            'desc': 'Responsible for front-end development on a Pathlight Project.It\'s a web application used to setup and watch deploy process.',
                            'technologies': [
                                'JavaScript', 'HTML', 'CSS', 'jQuery', 'HTL'
                            ]
                        }
                    ]
                },
                {
                    'company': 'C&S Software',
                    'time': '2016-2017',
                    'position': 'Front-end Developer',
                    'mainProjects': [
                        {
                            'desc': 'Responsible for creation and development of an application used for planogram management.',
                            'technologies': [
                                'HTML', 'CSS', 'jQuery', 'C#.Net (basics)', 'C#.Net Core'
                            ]
                        },
                        {
                            'desc': 'Responsible for creation from scratch of an application to visualise  shops in 3D in a web-browser.',
                            'technologies': [
                                'HTML', 'CSS', 'JS', 'Three.js'
                            ]
                        }
                    ]
                },
                {
                    'company': 'Eyedea',
                    'time': '2015-2016',
                    'position': 'Web Developer',
                    'mainProjects': [
                        {
                            'desc': 'Responsible for creation of web applications for the company\'s clients.',
                            'technologies': [
                                'React.js', 'Node.js', 'HTML', 'CSS', 'Javascript'
                            ]
                        }
                    ]
                },
                {
                    'company': 'NGLogic',
                    'time': '2015',
                    'position': 'Web Developer',
                    'mainProjects': [
                        {
                            'desc': 'Working on projects for the company\'s clients.',
                            'technologies': [
                                'Python/Django', 'HTML', 'Javascript', 'jQuery', 'CSS'
                            ]
                        }
                    ]
                },
                {
                    'company': 'TangramCare',
                    'time': '2014-2015',
                    'position': 'Junior Web Developer',
                    'mainProjects': [
                        {
                            'desc': 'Responsible for developing an application for medical sector',
                            'technologies': [
                                'Python/Django', 'HTML', 'CSS', 'Javascript', 'Angular 1.5'
                            ]
                        }
                    ]
                },
                {
                    'company': 'Transition Technologies',
                    'time': '2014',
                    'position': 'Junior Java Developer',
                    'mainProjects': [
                        {
                            'desc': 'Responsible for back-end development of an application as a junior developer',
                            'technologies': [
                                'HTML', 'CSS', 'Javascript', 'Java', 'Spring'
                            ]
                        }
                    ]
                }
            ],
            education: user.education || [
                {
                    'place': 'Białystok Technical University',
                    'time': '2015-2017',
                    'name': 'M. Sc., Computer Science',
                    'namePlace': 'Białystok'
                },
                {
                    'place': 'Białystok Technical University',
                    'time': '2011-2014',
                    'name': 'Eng., Computer Science',
                    'namePlace': 'Białystok'
                }
            ],
            professionalExpectations: 'As a front-end developer Dawid wants to develop his skills in current and new technologies as AngularJS and Node.js . He likes making nice looking and smooth working websites and applications. He sees himself as a front-end developer with full responsibility for software produced by him',
            personalNote: 'I am a front-end developer and a person of with hobbies like strategic, board and logic games.',
            skillset: {
                'languages': {
                    'main': ['HTML', 'Angular.JS', 'CSS'],
                    'second': ['SQL', 'React.JS']
                },
                'others': {
                    'main': ['jQuery', 'RWD', 'Bootstrap', 'SASS/LESS', 'Native', 'Node.js', 'D3.js', 'Gulp.js', 'Webpack'],
                    'second': ['Python', 'Django', 'Django Rest Framework', 'Java', 'C#', 'Spring MVC', 'Maven', 'Jira', 'SVN/Git/Mercurial', 'Netbeans', 'PostgresSQL', 'MySQL', 'MongoDB']
                }
            }
        };
        return userRef.set(data);
    }
}
