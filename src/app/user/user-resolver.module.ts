import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../user.service';
import { catchError } from 'rxjs/operators/catchError';
import { UserComponent } from './user.component';

@Injectable()
export class UserResolver implements Resolve<UserComponent> {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return Observable.create(observer => {
            this.userService.getUser(route.params['id']).subscribe(user => {
                observer.next(user[0]);
                observer.complete();
            });
        });
    }
}
