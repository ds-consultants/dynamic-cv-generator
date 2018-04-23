import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ProjectComponent } from '../project/project.component';
import { UserExperienceComponent } from './user-experience.component';
import { UserEducationComponent } from './user-education.component';
import { UserPersonalNoteComponent } from './user-personal-note.component';
import { UserProfExpectationsComponent } from './user-prof-expectations.component';
import { UserSkillsetComponent } from './user-skillset.component';
import { UserResolver } from './user-resolver.module';
import { PdfCompressorService } from '../pdf-compressor.service';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
// import { PdfCompressorService } from '../pdf-compressor.service';

describe('UserTestComponent', () => {

  let app: UserComponent;
  // let route: ActivatedRoute;
  // let pdf: PdfCompressorService;
  let fixture: ComponentFixture<UserComponent>;

  const fakeUser = {
    name: 'Marcin',
    title: 'Fake title',
    professionalExpectations: 'Cokolwiek',
    skillset: { languages: {main:  [], second: []},
                others: {main:  [], second: []}}

  };
  // this async is becouse component have separate file with css and template
  const fakeUserObserver = Observable.create(observer => {
    observer.next({ user: fakeUser});
    observer.complete();
  });

  const fakeActivatedRoute = {
    data: fakeUserObserver
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        UserSkillsetComponent
      ],
      providers: [
        UserResolver,
        PdfCompressorService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
      .compileComponents();

    // route = new ActivatedRoute();
    // pdf = new PdfCompressorService();
    // app = new UserComponent(route, pdf);
    // fix.detectChanges();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserComponent);
    app = fixture.componentInstance;
  }));

  it('should render userName', () => {
    fixture.detectChanges();
    // return first element that match
    const de = fixture.debugElement.query(By.css('.userName'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toBe('Marcin');
    // console.log(app);
    // console.log(fixture.debugElement);
    // expect(app).toBeTruthy();
  });
});
