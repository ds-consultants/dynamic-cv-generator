import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../user';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  template: '<div>{{backup}}</div>'
})

export class UsersDataBackupComponent {
  users: Observable<User[]>;
  backup: string;

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AuthService
  ) {
    this.backup = 'Starting Backup';

    this.auth.emailLogin(environment.backupEmail, environment.backupPassword).then(() => {

      this.users = this.afAuth.authState.pipe(
        switchMap(() => {
          return this.afs.collection<User>('users', ref => ref.orderBy('name', 'asc')).valueChanges();
        })
      );

      this.route.params.subscribe(params => {
        if (params['auth'] === environment.backupAuthKey) {
          this.uploadUsersData(this.users);
        }
      });

    });
  }

  private uploadUsersData(usersData) {
    usersData.subscribe((users) => {
      users.forEach((user) => {
        const {blob, filename, datestamp} = this.generateUserBlob(user);
        const ref = this.storage.ref(`backups/${datestamp}/${filename}`);
        ref.put(blob);
      });

      this.backup = 'Backup finished';
      setTimeout(() => this.afAuth.auth.signOut(), 5000);
    });
  }

  generateUserBlob(user: User) {
    const userClone = {...user};

    const exportString = JSON.stringify(userClone, null, 2);

    const timestamp = this.currentTime().toLocaleString().replace(/[ ]/g, '').replace(/[\/|,|:]/g, '_');
    const datestamp = this.currentTime().toLocaleDateString().replace(/[\/|,|:]/g, '_');

    const username = userClone.email.replace(/@.*/g, '');
    const blob = new Blob([exportString], {type: 'application/json;charset=utf-8'});

    const filename = `${username}.firebase.cv.${timestamp}.json`;

    return {blob, filename, datestamp};
  }

  currentTime() {
    return new Date();
  }
}
