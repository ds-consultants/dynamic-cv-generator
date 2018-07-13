import { AuthService } from './../core/auth/auth.service';
import { ProjectTechnologiesComponent } from './../project/technologies/technologies.component';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ProjectComponent } from '../project/project.component';
import { UserExperienceComponent } from './user-experience.component';
import { UserEducationComponent } from './user-education.component';
import { UserProfExpectationsComponent } from './user-prof-expectations.component';
import { UserSkillsetComponent } from './user-skillset.component';
import { UserResolver } from './user-resolver.module';
import { PdfCompressorService } from '../pdf-compressor.service';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { InlineEditorModule, InlineEditorComponent } from '@fradev/ngx-inline-editor';
import { TagInputModule } from 'ngx-chips';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { UserHeaderComponent } from './user-header.component';

import { CVPageOneDirective } from '../cv-page-one.directive';
import { CVPageTwoDirective } from '../cv-page-two.directive';
import { CVPageThreeDirective } from '../cv-page-three.directive';

import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

import { UserSkillsHeaderComponent } from './user-skills-header.component';
import { UserEducationHeaderComponent } from './user-education-header.component';
import { UserFooterComponent } from './user-footer.component';

describe('UserComponent', () => {

  let app: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const fakeUser = {
    name: 'Marcin',
    title: 'Fake title',
    professionalExpectations: 'Cokolwiek',
    skillset: { languages: {main:  [], second: []},
                others: {main:  [], second: []}},
    experience: []
  };

  const fakeUserObserver = Observable.create(observer => {
    observer.next({ user: fakeUser});
    observer.complete();
  });

  const fakeActivatedRoute = {
    data: fakeUserObserver
  } as ActivatedRoute;

  beforeEach(async(() => {

    const authSpy = jasmine.createSpyObj('AuthService', ['updateUserData']);
    authSpy.updateUserData.and.returnValue(new Promise(() => {}));

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          UserExperienceComponent,
          UserHeaderComponent,
          UserEducationComponent,
          UserProfExpectationsComponent,
          UserSkillsetComponent,
          UserEducationHeaderComponent
        ]
      }
    });

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        UserRoutingModule,
        InlineEditorModule,
        TagInputModule
      ],
      declarations: [
        UserComponent,
        ProjectComponent,
        UserExperienceComponent,
        UserEducationComponent,
        UserProfExpectationsComponent,
        UserSkillsetComponent,
        UserSettingsComponent,
        ProjectTechnologiesComponent,
        UserHeaderComponent,
        UserEducationHeaderComponent,
        CVPageOneDirective,
        CVPageTwoDirective,
        CVPageThreeDirective
      ],
      providers: [
        UserResolver,
        PdfCompressorService,
        AngularFireAuth,
        FirebaseApp,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: AuthService, useValue: authSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should define and compile component', () => {
    const de = fixture.debugElement;
    const el: HTMLElement = de.nativeElement;
    expect(fixture).toBeDefined();
  });

  it('should render userName', fakeAsync(() => {
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('.user-name'));
      const el: HTMLElement = de.nativeElement;
      expect(el.innerText).toBe('Marcin');
  }));
});
