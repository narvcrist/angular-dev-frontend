import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PairEvaluationComponent } from './pair-evaluation.component';

describe('PairEvaluationComponent', () => {
  let component: PairEvaluationComponent;
  let fixture: ComponentFixture<PairEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PairEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
