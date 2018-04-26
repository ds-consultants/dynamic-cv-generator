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
import { UserSkillsetComponent } from './user-skillset.component';
<<<<<<< HEAD
import { UserSettingsComponent } from '../user-settings/user-settings.component';
=======
import { CVPageOneDirective } from '../cv-page-one.directive';
import { CVPageTwoDirective } from '../cv-page-two.directive';
import { CVPageThreeDirective } from '../cv-page-three.directive';
import { UserHeaderComponent } from './user-header.component';
import { UserEducationHeaderComponent } from './user-education-header.component';

>>>>>>> User Experiance now as dynymic components
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
        UserSkillsetComponent,
<<<<<<< HEAD
        UserSettingsComponent
=======
        CVPageOneDirective,
        CVPageTwoDirective,
<<<<<<< HEAD
        CVPageThreeDirective
>>>>>>> User Experiance now as dynymic components
=======
        CVPageThreeDirective,
        UserHeaderComponent,
        UserEducationHeaderComponent
>>>>>>> Dynamic CV page generation up to education
    ],
    providers: [
        UserResolver,
        PdfCompressorService
    ],
    entryComponents: [
        UserExperienceComponent,
        UserHeaderComponent,
        UserEducationComponent,
        UserEducationHeaderComponent
    ]
})
export class UserModule { }
