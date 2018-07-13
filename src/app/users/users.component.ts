import { switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { of } from 'rxjs/observable/of';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent {
  users: Observable<User[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.afs.firestore.settings({ timestampsInSnapshots: true });

    this.users = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.collection<User>('users').valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }


}
