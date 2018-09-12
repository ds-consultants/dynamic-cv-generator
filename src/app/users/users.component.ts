import { switchMap, filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { of } from 'rxjs/observable/of';
import { User } from '../user';
import { FormValidatorService } from '../core/form-validator.service';
import { saveAs } from 'file-saver/FileSaver';
import { environment } from '../../environments/environment';

type UserFields = 'email' | 'password';
type FormErrors = {[u in UserFields]: string };

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  formErrors: FormErrors = {
    'email': '',
    'password': ''
};

  constructor(
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private validator: FormValidatorService
  ) {
    this.afs.firestore.settings({ timestampsInSnapshots: true });

    this.users = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.collection<User>('users', ref => ref.orderBy('name', 'asc')).valueChanges();
        } else {
          return of(null);
        }
      }),
      map(users => users.filter( (user) => user.email !== environment.backupEmail ))
    );
  }

  ngOnInit() {
    this.validator.buildForm(this.formErrors);
  }

  addUser() {
    this.auth.notify.clear();
    this.auth.addNewUser(
      this.validator.userForm.value['email'],
      this.validator.userForm.value['password']
    ).then((userCreated) => {
      if (userCreated) {
        this.validator.userForm.reset();
      }
    });
  }

  resetPassword(email: string) {
    if (confirm('Are you sure you want to send a reset password instruction email to: ' + email)) {
      this.auth.resetPassword(email);
    }
  }

  exportUserDataAsJson(user: User) {
    const userClone = {...user};

    const exportString = JSON.stringify(userClone, null, 2);

    const timeNow = new Date();
    const timestamp = timeNow.toLocaleString().replace(/[ ]/g, '').replace(/[\/|,|:]/g, '_');

    const userName = userClone.email.replace(/@.*/g, '');

    const blob = new Blob([exportString], {type: 'application/json;charset=utf-8'});
    saveAs(blob, `${userName}.firebase.cv.${timestamp}.json`);
  }

  importUserDataJson(user, event) {
    if (event.target.files && event.target.files[0] &&
      event.target.files[0].name.search(/\.firebase\.cv\./) > 0) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const importedUserData = JSON.parse(e.target.result);
        user = {...importedUserData, uid: user.uid, email: user.email, superUser: user.superUser};

        this.auth.updateUserData(user).then((result) => {
          alert('User updated with imported data');
        }).catch((error) => {
          console.log(error);
        });
      };

      reader.readAsText(event.target.files[0]);
    } else {
      alert('File doesn\'t match');
    }
  }

  triggerUserDataImport(uid) {
    document.getElementById(`import-user-${uid}`).click();
  }
}
