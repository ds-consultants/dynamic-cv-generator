import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../core/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { UserComponent } from './user.component';

@Injectable()
export class UserResolver implements Resolve<UserComponent> {
    constructor(
        private router: Router,
        private userService: AuthService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return Observable.create(observer => {
            this.userService.user.subscribe(user => {
                observer.next(user);
                observer.complete();
            });
        });
    }
}
