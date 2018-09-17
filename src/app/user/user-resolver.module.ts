import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../core/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { UserComponent } from './user.component';
import { User } from '../user';

@Injectable()
export class UserResolver implements Resolve<UserComponent> {
    constructor(
        private router: Router,
        private userService: AuthService,
        private afs: AngularFirestore
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return Observable.create(observer => {
              if (route.params['uid']) {
                this.afs.doc<User>(`users/${route.params['uid']}`).valueChanges().subscribe(user => {
                  observer.next(user);
                  observer.complete();
                });
              } else {
                this.userService.user.subscribe(user => {
                    observer.next(user);
                    observer.complete();
                });
              }
        });
    }
}
