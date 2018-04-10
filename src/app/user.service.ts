import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './user'
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }
  
  getUsers(): Observable<any[]> {
    return this.db.list('/persons').valueChanges();
  }

  getUser(name): Observable<any[]> {
    return this.db.list<User>('/persons', ref => ref.orderByChild('name').equalTo(name)).valueChanges();
  }
}
