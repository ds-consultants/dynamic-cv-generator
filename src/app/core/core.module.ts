import { NgModule } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { NotifyService } from './notify.service';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormValidatorService } from './form-validator.service';

@NgModule({
    imports: [
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    providers: [AuthService, NotifyService, FormValidatorService],
})
export class CoreModule { }
