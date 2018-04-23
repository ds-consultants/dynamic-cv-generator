import { NgModule } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { NotifyService } from './notify.service';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormValidatorService } from './form-validator.service';

@NgModule({
    imports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    providers: [AuthService, NotifyService, FormValidatorService],
})
export class CoreModule { }
