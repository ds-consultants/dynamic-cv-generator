import { PasswordValidation } from './../core/password-validation';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserSignUpComponent } from './user-sign-up.component';
import { FormValidatorService } from '../core/form-validator.service';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../core/auth/auth.service';
import { Router } from '@angular/router';


describe('UserSignUpComponent', () => {
  let app: UserSignUpComponent;
  let fixture: ComponentFixture<UserSignUpComponent>;


  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['emailSignUp', 'notify']);
    authSpy.emailSignUp.and.returnValue(new Promise(() => {}));
    authSpy.notify.and.returnValue({ msg: { content: '' } });

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.navigate.and.returnValue(true);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        UserSignUpComponent,
      ],
      providers: [
        FormValidatorService,
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSignUpComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should have SIGN UP label', async() => {
    const de = fixture.debugElement.query(By.css('h2'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Sign Up');
  });

  const findInputs = () => {
    const emailInput: HTMLInputElement = fixture.debugElement
      .query(By.css('#email')).nativeElement;
    const passwordInput: HTMLInputElement = fixture.debugElement
      .query(By.css('#password')).nativeElement;
    const passwordConfirmationInput: HTMLInputElement = fixture.debugElement
      .query(By.css('#password-confirmation')).nativeElement;

    const submitButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('.button')).nativeElement;

    return {emailInput, passwordInput, passwordConfirmationInput, submitButton};
  };

  it('should allow to fill in email and password and validate password', () => {
    const {emailInput, passwordInput, passwordConfirmationInput} = findInputs();

    emailInput.value = 'test@email.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));
    passwordConfirmationInput.value = 'password';
    passwordConfirmationInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(app.validator.formErrors.password).toContain('Password must include at least one letter and one number.');
  });

  it('should allow to fill in email and password and submit', fakeAsync(() => {
    const {emailInput, passwordInput, passwordConfirmationInput, submitButton} = findInputs();

    emailInput.value = 'test@email.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'password1';
    passwordInput.dispatchEvent(new Event('input'));
    passwordConfirmationInput.value = 'password1';
    passwordConfirmationInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    submitButton.click();

    expect(app.auth.emailSignUp).toHaveBeenCalled();
  }));
});
