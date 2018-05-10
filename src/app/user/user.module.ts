import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserExperienceComponent } from './user-experience.component';
import { ProjectComponent } from '../project/project.component';
import { UserEducationComponent } from './user-education.component';
import { UserProfExpectationsComponent } from './user-prof-expectations.component';
import { UserPersonalNoteComponent } from './user-personal-note.component';
import { UserSkillsHeaderComponent } from './user-skills-header.component';

import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserResolver } from './user-resolver.module';
import { PdfCompressorService } from '../pdf-compressor.service';
import { UserSkillsetComponent } from './user-skillset.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { CVPageOneDirective } from '../cv-page-one.directive';
import { CVPageTwoDirective } from '../cv-page-two.directive';
import { CVPageThreeDirective } from '../cv-page-three.directive';
import { UserHeaderComponent } from './user-header.component';
import { UserEducationHeaderComponent } from './user-education-header.component';
import { UserFooterComponent } from './user-footer.component';
import { TagsInputModule } from 'ngx-tags-input/dist';

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        UserRoutingModule,
        TagsInputModule.forRoot()

    ],
    declarations: [
        UserComponent,
        ProjectComponent,
        UserExperienceComponent,
        UserEducationComponent,
        UserProfExpectationsComponent,
        UserPersonalNoteComponent,
        UserSkillsetComponent,
        UserSettingsComponent,
        CVPageOneDirective,
        CVPageTwoDirective,
        CVPageThreeDirective,
        UserHeaderComponent,
        UserEducationHeaderComponent,
        UserFooterComponent,
        UserSkillsHeaderComponent
    ],
    providers: [
        UserResolver,
        PdfCompressorService
    ],
    entryComponents: [
        UserExperienceComponent,
        UserHeaderComponent,
        UserEducationComponent,
        UserEducationHeaderComponent,
        UserProfExpectationsComponent,
        UserFooterComponent,
        UserSkillsHeaderComponent,
        UserSkillsetComponent,
        UserPersonalNoteComponent
    ]
})
export class UserModule { }
