import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value; // to get value in input tag
        const passwordConfirmation = AC.get('passwordConfirmation').value; // to get value in input tag
        if (password !== passwordConfirmation) {
            AC.get('passwordConfirmation').setErrors({ equalToPassword: true });
        } else {
            return null;
        }
    }
}
