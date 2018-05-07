import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../core/auth/auth.service';
import { UserDataService } from '../core/user-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    name = '';

    constructor(
        public auth: AuthService,
        private afAuth: AngularFireAuth,
        private router: Router
    ) { }

    ngOnInit() {
        this.auth.user.subscribe(user => this.name = user.name);
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/']);
        });
    }

}
