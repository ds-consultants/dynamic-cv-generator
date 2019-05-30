import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InlineEditorModule } from '@fradev/ngx-inline-editor';
import { TagInputModule } from 'ngx-chips';
import { ParametrizePipe } from '../core/parametrize.pipe';
import { CVPageFourDirective } from '../cv-page-four.directive';
import { CVPageOneDirective } from '../cv-page-one.directive';
import { CVPageThreeDirective } from '../cv-page-three.directive';
import { CVPageTwoDirective } from '../cv-page-two.directive';
import { PdfCompressorService } from '../pdf-compressor.service';
import { ProjectComponent } from '../project/project.component';
import { ProjectTechnologiesComponent } from '../project/technologies/technologies.component';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { UserEducationHeaderComponent } from './user-education-header.component';
import { UserEducationComponent } from './user-education.component';
import { UserExperienceComponent } from './user-experience.component';
import { UserFooterComponent } from './user-footer.component';
import { UserHeaderComponent } from './user-header.component';
import { UserProfExpectationsComponent } from './user-prof-expectations.component';
import { UserResolver } from './user-resolver.module';
import { UserRoutingModule } from './user-routing.module';
import { UserSkillsHeaderComponent } from './user-skills-header.component';
import { UserSkillsetComponent } from './user-skillset.component';
import { UserComponent } from './user.component';



@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        UserRoutingModule,
        InlineEditorModule,
        TagInputModule,
        DragDropModule
    ],
    declarations: [
        UserComponent,
        ProjectComponent,
        ProjectTechnologiesComponent,
        UserExperienceComponent,
        UserEducationComponent,
        UserProfExpectationsComponent,
        UserSkillsetComponent,
        UserSettingsComponent,
        CVPageOneDirective,
        CVPageTwoDirective,
        CVPageThreeDirective,
        CVPageFourDirective,
        UserHeaderComponent,
        UserEducationHeaderComponent,
        UserFooterComponent,
        UserSkillsHeaderComponent,
        ParametrizePipe
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
    ]
})
export class UserModule { }
