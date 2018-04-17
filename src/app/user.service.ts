import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  getUsers(): Observable<any[]> {
    return this.db.list<User>('users').valueChanges();
  }

  getUser(name): Observable<User[]> {
    return this.db.list<User>('users', ref => ref.orderByChild('name').equalTo(name)).valueChanges();
  }
}
