import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/breadcrumb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { TeacherEvalService } from '../../../services/teacher-eval/teacher-eval.service';
import { TranslateService } from '@ngx-translate/core';
import { Evaluation } from 'src/app/models/teacher-eval/evaluation';
@Component({
  selector: 'app-student-evaluation-result',
  templateUrl: './student-evaluation-result.component.html',
  styleUrls: ['./student-evaluation-result.component.css']
})
export class StudentEvaluationResultComponent implements OnInit {
  evaluations: any[];

  constructor(private _breadcrumbService: BreadcrumbService,
    private _spinnerService: NgxSpinnerService,
    private _teacherEvalService: TeacherEvalService,
    private _messageService: MessageService,
    private _translate: TranslateService) { }

  ngOnInit(): void {
  }

  createEvaluation():void {
    this._spinnerService.show();
    this._teacherEvalService.post('evaluations/student_evaluations',{}).subscribe(
        response => {
            this._spinnerService.hide();
            this.evaluations = response['data']
            this._messageService.add({
                key: 'tst',
                severity: 'success',
                summary: response['msg']['summary'],
                detail:  response['msg']['detail'],
                life: 3000
            });
        }, error => {
            this._spinnerService.hide();
            this._messageService.add({
                key: 'tst',
                severity: 'error',
                summary: error.error.msg.summary,
                detail:  error.error.msg.detail,
                life: 5000
            });
        });
  }

}
