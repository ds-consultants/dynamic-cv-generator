import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { of } from 'rxjs/observable/of';
import { User } from '../user';
import { FormValidatorService } from '../core/form-validator.service';

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
      })
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
}
