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
            name: "Paweł Boguski",
            title: 'AEM Developer',
            experience:  [
              {
                "company": "Dynamic Solutions",
                "time": "2012-present",
                "position": "Java and AEM Consultant",
                projects: [
                  {
                    "name": "Ryanair",
                    "title": "AEM Developer",
                    "desc": "Work on CMS (Adobe Experience Manager) for ryanair.com website. Development of AEM components, pages and services. Customization of AEM standard features and authoring UI. Development of Apache Solr based search integrated with AEM pages publishing process. Upgrade of AEM 6.1 to 6.3.",
                    "technologies": [ "AEM", "Java", "HTL", "JSP", "HTML", "Apache Solr", "CSS", "JavaScript", "Maven", "JUnit", "Mockito", "AssertJ", "Chef" ]
                  },
                  {
                    "name": "HP",
                    "title": "Java Web Developer",
                    "desc": "Development of Web appplications based on AngularJS, Apache Struts 2, Apache Tiles and Oracle database. Development of Front-End application in AngularJS, Bootstrap and JSON API based on Java.",
                    "technologies": [ "AngularJS", "Java", "Apache Struts 2", "Apache Tiles", "JSP", "HTML", "Bootstrap", "CSS", "JavaScript", "Oracle", "SQL", "JSON" ]
                  },
                  {
                    "name": "MGR Integrations Solutions",
                    "title": "Java/TIBCO Consultant",
                    "desc": "Responsible for TIBCO ActiveMatrix BusinessWorks components development in PCS Integration for Deutsche Bahn AG. Development of TIBCO BusinessEvents application for trafic monitoring.",
                    "technologies": [ "TIBCO ActiveMatrix BusinessWorks", "TIBCO BW", "TIBCO BusinessEvents", "Java", "SQL", "PL/SQL" ]
                  },
                  {
                    "name": "Hypermedia",
                    "title": "Java/CQ5 Consultant",
                    "desc": "Responsible for requirements analysis, Java back-end/Adobe CQ5 application development, configuration, components development, deployment support and integration with external services in project for Yellow Pages Australia and All Bran, Chocovore projects for Kellogg's.",
                    "technologies": [ "CQ5", "Java", "JavaScript", "HTML", "CSS" ]
                  }
                ]
              },
              {
                "company": "Transition Technologies",
                "time": "2011-2012",
                "position": "Windchill PDMLink/Java Consultant",
                "mainProjects": [
                  {
                    "desc": "Responsible for PDMLink business configuration and customisation, release  workflow implementation, integration  with external system and CAD workers customisations in PLM system migration project for Knorr-Bremse AG. ",
                    "technologies": ["Windchill PDMLink", "Java"]
                  },
                  {
                    "desc": "Responsible for migration of user interface customisations from Wind- chill PDMLink 9.1 to 10.0 in UI migration project for Continental AG. Responsible for Windchill PDMLink 9.1 Change Management customisations  including workflows, forms processing, business types configuration, lifecycles, web services in Change Management customisation project for Continental AG.",
                    "technologies": [ "Windchill PDMLink", "Java" ]
                  },
                  {
                    "desc": "Responsible for developing promotion process workflows for  CAD objects in Promotion process workflows customisation project for Mettler Toledo.",
                    "technologies": [ "Windchill PDMLink", "Java" ]
                  }
                ]
              }
            ],
            education: [
              {
                "place": "Białystok University of  Technology",
                "time": "2005-2010",
                "name": "M. Sc., Eng., Computer Science",
                "namePlace": "Białystok"
              }
            ],
            skillset: {
              "languages": {
                "main": [ "Java", "JavaScript", "SQL" ],
                "second": [ "HTML", "CSS" ]
              },
              "others": {
                "main": [ "AEM", "HTL", "JSP", "Spring", "Java Servlets", "JUnit", "Mockito", "AssertJ", "Maven", "IntelliJ IDEA" ],
                "second": [ "AngularJS", "jQuery", "Git", "Jira", "Stash", "Scrum" ]
              }
            },
            professionalExpectations: "Paweł is always looking forward for new experiences  and opportunities to get to know new  technologies. He sees himself as senior AEM developer in projects related to products based on Adobe platform.",
            personalNote: "I am a full-stack developer interested in sport, piano, guitar and chess."
          
        
        };
        return userRef.set(data);
    }
}
