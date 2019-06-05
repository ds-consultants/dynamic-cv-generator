// import { UserSettingsComponent } from './user-settings/user-settings.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth/auth.guard';
// Core
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './header/header.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { UserResolver } from './user/user-resolver.module';
import { UsersDataBackupComponent } from './users-data-backup/users-data-backup.component';
import { UsersComponent } from './users/users.component';




@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UsersDataBackupComponent,
        UserLoginComponent,
        UserSignUpComponent,
        HeaderComponent
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
        ReactiveFormsModule,
        DragDropModule
    ],
    providers: [AuthGuard, UserResolver],
    bootstrap: [AppComponent]
})
export class AppModule { }
