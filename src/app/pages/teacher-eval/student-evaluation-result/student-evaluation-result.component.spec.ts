import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEvaluationResultComponent } from './student-evaluation-result.component';

describe('StudentEvaluationResultComponent', () => {
  let component: StudentEvaluationResultComponent;
  let fixture: ComponentFixture<StudentEvaluationResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEvaluationResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEvaluationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
