import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../shared/breadcrumb.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Answer } from '../../../models/teacher-eval/answer';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherEvalService } from '../../../services/teacher-eval/teacher-eval.service';
import { IgnugService } from '../../../services/ignug/ignug.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-answer',
    templateUrl: './answer.component.html',
    styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

    status: any[];
    formAnswer: FormGroup;
    displayFormAnswer: boolean;
    answers: Answer[];
    selectedAnswer: Answer;
    headerDialogAnswer: string;
    colsAnswer: any[];
    flagEditAnswer: boolean;

    constructor(private _breadcrumbService: BreadcrumbService,
        private _fb: FormBuilder,
        private _confirmationService: ConfirmationService,
        private _spinnerService: NgxSpinnerService,
        private _teacherEvalService: TeacherEvalService,
        private _ignugService: IgnugService,
        private _messageService: MessageService,
        private _translate: TranslateService,
    ) {
        this._breadcrumbService.setItems([
            { label: 'answers' }
        ]);

        this.answers = [];
        this.buildFormAnswer();

    }

    ngOnInit(): void {

        this.status = [
            { label: '', value: '' }
        ];

        this.getAnswers();
        this.setColsAnswer();
        this.getTypeStatus();

    }

    setColsAnswer() {
        this._translate.stream('CODE').subscribe(response => {
            this.colsAnswer = [
                { field: 'code', header: this._translate.instant('CODE') },
                { field: 'order', header: this._translate.instant('ORDER') },
                { field: 'name', header: this._translate.instant('NAME') },
                { field: 'value', header: this._translate.instant('VALUE') },
                { field: 'status.name', header: this._translate.instant('STATUS') },
            ];
        });

    }

    getTypeStatus(): void {
        const parameters = '?type=STATUS';
        this._teacherEvalService.get('catalogues' + parameters).subscribe(
            response => {
                const typeStatus = response['data']
                this.status = [{ label: 'Seleccione', value: '' }];
                typeStatus.forEach(item => {
                    this.status.push({ label: item.name, value: item.id });
                });

            }, error => {
                this._messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: error.error.msg.summary,
                    detail:  error.error.msg.detail,
                    life: 5000
                });
            });
    }

    getStatusName(id: number) {
        const status = this.status.find(stat => stat.value === id)
        return status ? status.label : ""
    }

    getAnswers() {
        this._spinnerService.show();
        this._teacherEvalService.get('answers').subscribe(
            response => {
                this._spinnerService.hide();
                this.answers = response['data'];
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
                    detail: error.error.msg.detail,
                    life: 5000
                });
            });
    }

    buildFormAnswer() {
        this.formAnswer = this._fb.group({
            id: [''],
            code: ['', Validators.required],
            order: ['', Validators.required],
            name: ['', Validators.required],
            value: ['', Validators.required],
            status_id: ['', Validators.required]
        });
    }

    onSubmitAnswer(event: Event) {
        event.preventDefault();
        if (this.formAnswer.valid) {
            if (this.flagEditAnswer) {
                this.updateAnswer();
            } else {
                this.createAnswer();
            }
        } else {
            this.formAnswer.markAllAsTouched();
        }
    }
    selectAnswer(answer: Answer): void {
        if (answer) {
            this.selectedAnswer = answer;
            this.formAnswer.controls['id'].setValue(answer.id);
            this.formAnswer.controls['code'].setValue(answer.code);
            this.formAnswer.controls['order'].setValue(answer.order);
            this.formAnswer.controls['name'].setValue(answer.name);
            this.formAnswer.controls['value'].setValue(answer.value);
            this.formAnswer.controls['status_id'].setValue(answer.status.id);
            this._translate.stream('MODIFY RECORD').subscribe(response => {
                this.headerDialogAnswer = response;
            });
        } else {
            this.selectedAnswer = {};
            this.formAnswer.reset();
            this._translate.stream('NEW RECORD').subscribe(response => {
                this.headerDialogAnswer = response;
            });
        }
        this.displayFormAnswer = true;
    }

    createAnswer() {
        this.selectedAnswer = this.castAnswer();
        this._spinnerService.show();
        this._teacherEvalService.post('answers', {
            answer: this.selectedAnswer,
            status: this.selectedAnswer.status
        }).subscribe(
            response => {
                this.selectedAnswer.id = response['data']['id']
                this.answers.unshift(this.selectedAnswer);
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: response['msg']['summary'],
                    detail:  response['msg']['detail'],
                    life: 5000
                });
                this.displayFormAnswer = false;
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

    updateAnswer() {
        this.selectedAnswer = this.castAnswer();
        this._spinnerService.show();
        this._teacherEvalService.update('answers/' + this.selectedAnswer.id, {
            answer: this.selectedAnswer,
            status: this.selectedAnswer.status
        }).subscribe(
            response => {
                const indiceUser = this.answers
                    .findIndex(element => element.id === this.selectedAnswer.id);
                this.answers.splice(indiceUser, 1, response['data']);
                this._spinnerService.hide();
                this._messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: response['msg']['summary'],
                    detail:  response['msg']['detail'],
                    life: 5000
                });
                this.displayFormAnswer = false;
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

    deleteAnswer(answer: Answer) {
        this._confirmationService.confirm({
            header: 'Delete ' + answer.name,
            message: 'Are you sure to delete?',
            acceptButtonStyleClass: 'ui-button-danger',
            rejectButtonStyleClass: 'ui-button-secondary',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            icon: 'pi pi-trash',
            accept: () => {
                this._spinnerService.show();
                this._teacherEvalService.delete('answers/' + answer.id).subscribe(
                    response => {
                        const indiceUser = this.answers
                            .findIndex(element => element.id === answer.id);
                        this.answers.splice(indiceUser, 1);
                        this._spinnerService.hide();
                        this._messageService.add({
                            key: 'tst',
                            severity: 'success',
                            summary: response['msg']['summary'],
                            detail:  response['msg']['detail'],
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
        });

    }

    castAnswer(): Answer {
        return {
            id: this.formAnswer.controls['id'].value,
            code: this.formAnswer.controls['code'].value,
            order: this.formAnswer.controls['order'].value,
            name: this.formAnswer.controls['name'].value,
            value: this.formAnswer.controls['value'].value,
            status: { id: this.formAnswer.controls['status_id'].value },
        } as Answer;
    }


}
