import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserExperienceComponent } from './user-experience.component';
import { ProjectComponent } from '../project/project.component';
import { UserEducationComponent } from './user-education.component';
import { UserProfExpectationsComponent } from './user-prof-expectations.component';
import { UserPersonalNoteComponent } from './user-personal-note.component';

import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserResolver } from './user-resolver.module';
import { PdfCompressorService } from '../pdf-compressor.service';
import { SkillsetComponent } from '../skillset/skillset.component';
import { skipWhile } from 'rxjs/operator/skipWhile';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    ProjectComponent,
    UserExperienceComponent,
    UserEducationComponent,
    UserProfExpectationsComponent,
    UserPersonalNoteComponent,
    SkillsetComponent
  ],
  providers: [
    UserResolver,
    PdfCompressorService
  ]
})
export class UserModule { }
