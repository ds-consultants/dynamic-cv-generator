import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfExpectationsComponent } from './prof-expectations.component';

describe('ProfExpectationsComponent', () => {
  let component: ProfExpectationsComponent;
  let fixture: ComponentFixture<ProfExpectationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfExpectationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfExpectationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
