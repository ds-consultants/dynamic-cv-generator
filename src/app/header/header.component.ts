import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../core/auth/auth.service';
import { User } from '../user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    name = '';
    superUser = false;
    userUid = '';

    constructor(
        public auth: AuthService,
        private afAuth: AngularFireAuth,
        private router: Router
    ) { }

    ngOnInit() {
      this.router.events.subscribe(val => {
        if (val instanceof RoutesRecognized) {
          this.userUid = val.state.root.firstChild.params['uid'];
        }
      });

      this.auth.user.subscribe(user => {
        this.name = user !== null ? user.name : '';
        this.superUser = user !== null ? user.superUser : false;
      });
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
    }

}
