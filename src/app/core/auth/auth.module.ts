import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
    imports: [
        CommonModule,
        AngularFireAuthModule
    ],
    declarations: []
})
export class AuthModule { }
