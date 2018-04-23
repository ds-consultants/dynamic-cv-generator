import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { FormValidatorService } from '../core/form-validator.service';


type UserFields = 'email' | 'password';
type FormErrors = {[u in UserFields]: string };

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
})

export class UserLoginComponent implements OnInit {
    passReset = false; // set to true when password reset is triggered
    formFields: FormErrors = {
        'email': '',
        'password': ''
    };

    constructor(
        public auth: AuthService,
        private router: Router,
        private validator: FormValidatorService
    ) { }

    /// Shared
    private afterSignIn() {
        // Do after login stuff here, such router redirects, toast messages, etc.
        this.router.navigate(['/']);
    }

    private handleError(error: Error) {
        this.auth.notify.update(error.message);
    }

    ngOnInit() {
        this.validator.buildForm(this.formFields);
    }

    login() {
        this.auth.notify.clear();
        this.auth.emailLogin(this.validator.userForm.value['email'], this.validator.userForm.value['password'])
            .then(() => this.afterSignIn())
            .catch((error) => this.handleError(error));
    }

    resetPassword() {
        this.auth.resetPassword(this.validator.userForm.value['email'])
            .then(() => this.passReset = true);
    }

}
