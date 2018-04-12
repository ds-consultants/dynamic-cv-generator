import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { UsersComponent } from './users/users.component';
import { UserService } from './user.service';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './/app-routing.module';
import { UserExperienceComponent } from './user-experience/user-experience.component';
import { ProjectComponent } from './project/project.component';
import { UserEducationComponent } from './user-education/user-education.component';
import { ProfExpectationsComponent } from './prof-expectations/prof-expectations.component';
import { PersonalNoteComponent } from './personal-note/personal-note.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    UserExperienceComponent,
    ProjectComponent,
    UserEducationComponent,
    ProfExpectationsComponent,
    PersonalNoteComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
