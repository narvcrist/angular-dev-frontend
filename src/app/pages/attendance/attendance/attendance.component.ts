import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, Message, MessageService, PrimeNGConfig} from 'primeng/api';
import {BreadcrumbService} from '../../../shared/breadcrumb.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {NgxSpinnerService} from 'ngx-spinner';
import {AttendanceService} from '../../../services/attendance/attendance.service';
import {Attendance, Workday, Task} from '../../../models/attendance/models.index';
import {User, Role} from '../../../models/auth/models.index';
import {Event, Col} from '../../../models/setting/models.index';
import * as moment from 'moment';
import {Institution} from '../../../models/ignug/institution';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['attendance.component.scss']
})

export class AttendanceComponent implements OnInit {
    user: User;
    role: Role;
    processes: any[];
    activities: any[];
    colsActivies: Col[];
    selectedActivity: Workday;
    currentDate: any;
    selectedDate: Date;
    optionsFullCalendar: any;
    attendances: Attendance[];
    attendance: Attendance;
    workday: Workday;
    task: Task;
    msgs: Message[];
    msgsErrors: Message[];
    checked: boolean;
    events: Event[];
    selectedTask: Task;
    formTask: FormGroup;
    selectedTab: number;
    historyAttendances: Attendance[];
    data: any;
    options: any;
    institution: Institution;
    percentages: number[];

    constructor(private _breadcrumbService: BreadcrumbService,
                private _attendanceService: AttendanceService,
                private _spinner: NgxSpinnerService,
                private _router: Router,
                private _fb: FormBuilder,
                private messageService: MessageService,
                private primengConfig: PrimeNGConfig,
                private _confirmationService: ConfirmationService) {
        this._breadcrumbService.setItems([
            {label: 'Dashboard', routerLink: '/dashboard'},
            {label: 'Asistencia'},
        ]);
        this.primengConfig.ripple = true;
        this.role = JSON.parse(localStorage.getItem('role')) as Role;
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.institution = JSON.parse(localStorage.getItem('institution')) as Institution;
        this.colsActivies = [
            {field: 'name', header: 'ACTIVIDAD'}
        ];
        this.attendance = {workdays: [], tasks: []};
        this.selectedTask = {type: {}};
        this.processes = [];
        this.selectedTab = 0;
        this.historyAttendances = [];
        this.selectedDate = new Date();
        this.currentDate = moment();
        this.percentages = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    }

    ngOnInit() {
        setInterval(() => {
            this.currentDate = moment();
        }, 1000);
        this.fullCalendar();
        this.getProcesses();
        this.getAttendances();
        this.getAttendance();
        this.buildFormTask();
        this.fillChart();
        this.getHistoryTasks();
    }

    buildFormTask() {
        this.formTask = this._fb.group({
            percentage_advance: ['1', Validators.required],
        });
    }

    getAttendances() {
        this._spinner.show();
        this._attendanceService.get('attendances/user_attendances').subscribe(response => {
            this._spinner.hide();
            this.attendances = response['data'];
            this.fillFullCalendar();
        }, error => {
            this._spinner.hide();
            this.msgsErrors = [{
                severity: 'error',
                summary: error.error.msg.summary,
                detail: error.error.msg.detail,
            }];
        });
    }

    getHistoryTasks() {
        this._spinner.show();
        this._attendanceService.post('attendances/user_history_attendances', {
            start_date: this.selectedDate.toDateString(),
            end_date: this.selectedDate.toDateString()
        }).subscribe(response => {
            this._spinner.hide();
            this.historyAttendances = response['data'];
        }, error => {
            this._spinner.hide();
            this.msgsErrors = [{
                severity: 'error',
                summary: error.error.msg.summary,
                detail: error.error.msg.detail,
            }];
        });
    }

    getAttendance() {
        this._spinner.show();
        this._attendanceService.get('attendances/user_current_day').subscribe(response => {
            this._spinner.hide();
            this.attendance = response['data'];
            this.currentDate = moment(this.attendance.date);
        }, error => {
            this._spinner.hide();
            this.msgsErrors = [{
                severity: 'error',
                summary: error.error.msg.summary,
                detail: error.error.msg.detail,
            }];
        });
    }

    createOrUpdateTask() {
        // this.selectedTask.percentage_advance = this.formTask.controls['percentage_advance'].value;
        this.selectedTask.percentage_advance = 100; // temporalmente hasta que se defina bien el proceso
        this.selectedTask.description = '';
        this.formTask.controls['percentage_advance'].setValue('1');
        this._spinner.show();
        this._attendanceService.post('tasks', {task: this.selectedTask}).subscribe(response => {
            this._spinner.hide();
            this.attendance = response['data'];
            this.selectedDate = new Date();// para que se pueda visualizar la actividad cread
            this.getAttendances();
            this.getHistoryTasks();
            this.fillChart();
            this.messageService.add({
                key: 'msgToast',
                severity: 'success',
                summary: response['msg']['summary'],
                detail: response['msg']['detail']
            });
        }, error => {
            this._spinner.hide();
            this.messageService.add({
                key: 'msgToast',
                severity: 'error',
                summary: error.error.msg.summary,
                detail: error.error.msg.detail,
            });
        });
    }

    deleteTask(task: Task) {
        this._confirmationService.confirm({
            message: '¿Está seguro de eliminar el registro?',
            header: 'Confirmiación de elimnación',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this._spinner.show();
                this._attendanceService.delete('tasks/' + task.id).subscribe(response => {
                    this._spinner.hide();
                    this.getHistoryTasks();
                    this.fillChart();
                    this.messageService.add({
                        key: 'msgToast',
                        severity: 'success',
                        summary: response['msg']['summary'],
                        detail: response['msg']['detail']
                    });
                }, error => {
                    this._spinner.hide();
                    this.msgsErrors = [{
                        severity: 'error',
                        summary: error.error.msg.summary,
                        detail: error.error.msg.detail,
                    }];
                });
            },
            reject: () => {

            }
        });
    }

    startWorkday(type: string) {
        this.msgsErrors = [];
        this.checked = false;
        this.workday = {
            description: (type === 'WORK') ? 'JORNADA' : 'ALMUERZO',
            type: {code: type}
        };
        this.selectedTab = 0;
        this._spinner.show();
        this._attendanceService.post('workdays/start_day', {workday: this.workday}).subscribe(response => {
            this._spinner.hide();
            this.attendance = response['data'];
            this.getAttendances();
        }, error => {
            this._spinner.hide();
            this.msgsErrors = [{
                severity: 'error',
                summary: error.error.msg.summary,
                detail: error.error.msg.detail,
            }];
        });
    }

    endWorkday(workday: Workday) {
        this._confirmationService.confirm({
            message: '¿Está seguro de finalizar?',
            header: 'Confirmiación de finalización',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this._spinner.show();
                this._attendanceService.update('workdays/end_day', {workday}).subscribe(response => {
                    this._spinner.hide();
                    this.attendance.workdays = response['data'];
                    this.msgsErrors = [];
                    this.getAttendances();
                }, error => {
                    this._spinner.hide();
                    this.msgsErrors = [{
                        severity: 'error',
                        summary: error.error.msg.summary,
                        detail: error.error.msg.detail,
                    }];
                });
            },
            reject: () => {

            }
        });
    }

    getProcesses() {
        this._attendanceService.get('tasks/processes').subscribe(response => {
            this.processes = response['data'];
        }, error => {
            this.msgsErrors = [{
                severity: 'error',
                summary: error.error.msg.summary,
                detail: error.error.msg.detail,
            }];
        });
    }

    fullCalendar() {
        this.optionsFullCalendar = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            defaultDate: moment().format('YYYY-MM-DD'),
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth'
                // right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }
        };
    }

    fillFullCalendar() {
        this.events = [];
        this.attendances.forEach(attendance => {
            attendance.workdays.forEach(workday => {
                this.events.push({
                    id: workday.id,
                    title: 'Inicio ' + workday.description,
                    start: attendance.date + 'T' + workday.start_time
                });

                this.events.push({
                    id: workday.id,
                    title: 'Fin ' + workday.description,
                    start: attendance.date + 'T' + workday.end_time
                });
            });
        });
    }

    selectActivity(activity) {
        console.log(activity);
    }

    changeIndex(event) {
        this.selectedTab = event.index;
    }

    onSubmitTask(event) {
        event.preventDefault();
        if (this.formTask.valid) {
            this.createOrUpdateTask();
        } else {
            this.formTask.markAllAsTouched();
        }
    }

    fillChart() {
        this._spinner.show();
        this._attendanceService.get('tasks/total_processes').subscribe(response => {
            this._spinner.hide();
            const data = response['data']['data'];
            const labels = response['data']['labels'];
            const backgroundColor = response['data']['background_color'];
            this.data = {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor
                    }]
            };
            this.options = {
                legend: {
                    position: 'left'
                },

            };
        }, error => {
            this._spinner.hide();
            this.msgsErrors = [{
                severity: 'error',
                summary: error.error.msg.summary,
                detail: error.error.msg.detail,
            }];
        });
    }
}
