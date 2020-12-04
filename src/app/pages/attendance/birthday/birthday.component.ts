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
import {environment} from '../../../../environments/environment';
import {Moment} from 'moment';
import {element} from 'protractor';

@Component({
    selector: 'app-attendance',
    templateUrl: './birthday.component.html',
    styleUrls: ['birthday.component.scss']
})

export class BirthdayComponent implements OnInit {
    users: User[];
    currentMonth: string;
    STORAGE_URL: string = environment.STORAGE_URL;

    constructor(private _breadcrumbService: BreadcrumbService,
                private _attendanceService: AttendanceService,
                private _spinner: NgxSpinnerService) {
        this._breadcrumbService.setItems([
            {label: 'Dashboard', routerLink: '/dashboard'},
            {label: 'Cumpleañeros'},
        ]);

        this.currentMonth = moment().format('MM');
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this._spinner.show();
        this._attendanceService.get('birthdate').subscribe(response => {
            this._spinner.hide();
            this.users = response['data'];
            this.users = this.users.filter(element => element.birthdate.toString().substr(5, 2) === this.currentMonth);
            this.users.sort(function (a, b) {
                if (a.birthdate.toString().substr(5, 2) <= b.birthdate.toString().substr(5, 2)) {
                    if (a.birthdate.toString().substr(5, 2) < b.birthdate.toString().substr(5, 2)) {
                        return -1;
                    }
                    return 0;
                } else {
                    return 1;
                }
            });
        }, error => {
            this._spinner.hide();
        })
    }
}
