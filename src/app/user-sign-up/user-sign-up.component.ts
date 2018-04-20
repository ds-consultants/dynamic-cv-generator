import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { FormValidatorService } from '../core/form-validator.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html'
})
export class UserSignUpComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private validator: FormValidatorService
  ) { }

  ngOnInit() {
    this.validator.buildForm();
  }

  signup() {
    this.auth.emailSignUp(this.validator.userForm.value['email'], this.validator.userForm.value['password'])
      .then(() => this.afterSignUp());
  }

  private afterSignUp() {
    this.router.navigate(['/']);
  }
}
