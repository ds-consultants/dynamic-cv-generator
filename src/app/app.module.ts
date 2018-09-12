import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { UsersComponent } from './users/users.component';
import { UsersDataBackupComponent } from './users-data-backup/users-data-backup.component';
import { AppRoutingModule } from './app-routing.module';

import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './core/auth/auth.guard';
// Core
import { CoreModule } from './core/core.module';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { HeaderComponent } from './header/header.component';
import { UserResolver } from './user/user-resolver.module';
// import { UserSettingsComponent } from './user-settings/user-settings.component';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UsersDataBackupComponent,
        UserLoginComponent,
        UserSignUpComponent,
        HeaderComponent,
        // UserSettingsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [AuthGuard, UserResolver],
    bootstrap: [AppComponent]
})
export class AppModule { }
