import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/breadcrumb.service';
import { MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherEvalService } from '../../../services/teacher-eval/teacher-eval.service';
import { TranslateService } from '@ngx-translate/core';
import { PairEvaluation } from 'src/app/models/teacher-eval/pair-evaluation';
import { EVALUATION_TYPES } from 'src/environments/catalogues';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-pair-evaluation',
  templateUrl: './pair-evaluation.component.html',
  styleUrls: ['./pair-evaluation.component.scss']
})
export class PairEvaluationComponent implements OnInit {

  status: any[];
  formPairEvaluation: FormGroup;
  questionsTeaching: any[];
  questionsManagement: any[];
  pairEvaluation: PairEvaluation;
  selectedPairEvaluation: PairEvaluation;
  displayFormPairEvaluation: boolean;
  displaySendFormSuccess: boolean;
  displayVerificated: boolean;
  displayVisible: boolean;
  evaluatorTeaching: any[];
  evaluatorManagement: any[];
  detailEvaluatorTeachining: number;
  detailEvaluatorManagement: number;

  constructor(private _breadcrumbService: BreadcrumbService,
    private _fb: FormBuilder,
    private _spinnerService: NgxSpinnerService,
    private _teacherEvalService: TeacherEvalService,
    private _messageService: MessageService,
    private _translate: TranslateService
  ) {
    this._breadcrumbService.setItems([
      { label: 'pairEvaluations' }
    ]);

    this.questionsTeaching = [];
    this.questionsManagement = [];

    this.buildformPairEvaluation();

  }

  ngOnInit(): void {

    this.evaluatorTeaching = [];
    this.evaluatorManagement = [];

    this.getQuestions();
    this.getEvaluators();

  }
  getEvaluators(): void {
    const parameters = '?detail_evaluationable_id= 2';
    this._teacherEvalService.get('detail_evaluations' + parameters).subscribe(
      response => {
        if (response !== null) {
          this._spinnerService.hide();
          this.displayVisible = true;
          response['data'].map((item: any) => {
            if (item.evaluation.evaluation_type_id == EVALUATION_TYPES.PAIR_TEACHING) {
              this.evaluatorTeaching.push({ id: item.id })
            } else if (item.evaluation.evaluation_type_id == EVALUATION_TYPES.PAIR_MANAGEMENT) {
              this.evaluatorManagement.push({ id: item.id })
            }
          })
          for (let i = 0; i < this.evaluatorTeaching.length; i++) {
            this.detailEvaluatorTeachining = this.evaluatorTeaching[i];
          }
          for (let i = 0; i < this.evaluatorManagement.length; i++) {
            this.detailEvaluatorManagement = this.evaluatorManagement[i];
          }
        }else{
          this.displayVerificated = true;
        }
      }, error => {
        this.displayVerificated = true;
        this._spinnerService.hide();
        this._messageService.add({
          key: 'tst',
          severity: 'error',
          summary: error.error.msg.summary,
          detail: error.error.msg.detail,
          life: 5000
        });
      });
  }

  getQuestions(): void {
    this._spinnerService.show();
    this.displayFormPairEvaluation = false;
    this._teacherEvalService.get('types_questions/pair_evaluations').subscribe(
      response => {
        this._spinnerService.hide();
        this.displayFormPairEvaluation = true;

        response['data'].map(question => {
          if (question.evaluation_type_id == EVALUATION_TYPES.PAIR_TEACHING) {
            this.questionsTeaching.push(question)
          } else if (question.evaluation_type_id == EVALUATION_TYPES.PAIR_MANAGEMENT) {
            this.questionsManagement.push(question)
          }
        })

        this.questionsTeaching.map(question => {
          this.teachingArray.push(new FormControl("", Validators.required));
        })

        this.questionsManagement.map(question => {
          this.managementArray.push(new FormControl("", Validators.required));
        })

      }, error => {
        //this._spinnerService.hide();
        this._messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Oops! Problemas con el servidor',
          //detail: error.error.msg.detail,
          life: 5000
        });
      });
  }



  buildformPairEvaluation() {
    this.formPairEvaluation = this._fb.group({
      id: [''],
      detail_evaluation_id: [''],
      teachingArray: new FormArray([]),
      managementArray: new FormArray([])
    });
  }
  get teachingArray() {
    return this.formPairEvaluation.get('teachingArray') as FormArray;
  }
  get managementArray() {
    return this.formPairEvaluation.get('managementArray') as FormArray;
  }
  onSubmitPairEvaluation(event: Event) {
    event.preventDefault();
    if (this.formPairEvaluation.valid) {
      this.createPairEvaluationTeaching();
      this.createPairEvaluationManagement();

    } else {
      this.formPairEvaluation.markAllAsTouched();
    }

  }

  createPairEvaluationTeaching() {
    this.selectedPairEvaluation = this.castPairEvaluationTeaching();
    this._spinnerService.show();
    this._teacherEvalService.post('pair_evaluations/teachers', {
      detail_evaluation: this.detailEvaluatorTeachining,
      answer_questions: this.selectedPairEvaluation.answer_questions
    }).subscribe(
      response => {
        this._spinnerService.hide();
        this.formPairEvaluation.reset();
        this._messageService.add({
          key: 'tst',
          severity: 'success',
          summary: response['msg']['summary'],
          detail: response['msg']['detail'],
          life: 5000
        });
      }, error => {
        this._spinnerService.hide();
        this._messageService.add({
          key: 'tst',
          severity: 'error',
          summary: error.error.msg.summary,
          detail: error.error.msg.detail,
          life: 5000
        });
      });
  }
  createPairEvaluationManagement() {
    this.selectedPairEvaluation = this.castPairEvaluationManagement();
    this._spinnerService.show();
    this._teacherEvalService.post('pair_evaluations/teachers', {
      detail_evaluation: this.detailEvaluatorManagement,
      answer_questions: this.selectedPairEvaluation.answer_questions
    }).subscribe(
      response => {
        this._spinnerService.hide();
        this.formPairEvaluation.reset();
        this.displayFormPairEvaluation = false;
        this.displaySendFormSuccess = true;
        this._messageService.add({
          key: 'tst',
          severity: 'success',
          summary: response['msg']['summary'],
          detail: response['msg']['detail'],
          life: 3000
        });
      }, error => {
        this._spinnerService.hide();
        this._messageService.add({
          key: 'tst',
          severity: 'error',
          summary: error.error.msg.summary,
          detail: error.error.msg.detail,
          life: 5000
        });
      });
  }

  castPairEvaluationTeaching(): PairEvaluation {
    return {
      id: this.formPairEvaluation.controls['id'].value,
      answer_questions: this.formPairEvaluation.controls['teachingArray'].value.map((answer_question_id: any) => {
        return { id: answer_question_id }
      }),

    } as PairEvaluation;
  }
  castPairEvaluationManagement(): PairEvaluation {
    return {
      id: this.formPairEvaluation.controls['id'].value,
      answer_questions: this.formPairEvaluation.controls['managementArray'].value.map((answer_question_id: any) => {
        return { id: answer_question_id }
      }),

    } as PairEvaluation;
  }

}
