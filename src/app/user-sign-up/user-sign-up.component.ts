import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { FormValidatorService } from '../core/form-validator.service';

type UserFields = 'email' | 'password' | 'passwordConfirmation';
type FormErrors = {[u in UserFields]: string };

@Component({
    selector: 'app-user-sign-up',
    templateUrl: './user-sign-up.component.html'
})

export class UserSignUpComponent implements OnInit {
    formErrors: FormErrors = {
        'email': '',
        'password': '',
        'passwordConfirmation': ''
    };

    constructor(
        public auth: AuthService,
        private router: Router,
        public validator: FormValidatorService
    ) { }

    ngOnInit() {
        this.validator.buildForm(this.formErrors);
    }

    signup() {
      this.auth.emailSignUp(this.validator.userForm.value['email'], this.validator.userForm.value['password'])
        .then(() => this.afterSignUp());
    }

    private afterSignUp() {
        this.router.navigate(['/']);
    }
}
