import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../shared/breadcrumb.service';
import {Role} from '../../models/auth/role';
import {Permission} from '../../models/auth/permission';
import {environment} from '../../../environments/environment';
import {ROLES} from '../../../environments/catalogues';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/auth/user';
import {Institution} from '../../models/ignug/institution';
import {Message} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import * as moment from 'moment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    shortcuts: any[];
    role: Role;
    user: User;
    institution: Institution;
    permissions: Permission[];
    STORAGE_URL: string;
    msgs: Message[];
    flagBirhday: boolean;
    randomNumber: number = 0;

    constructor(
        private _breadcrumbService: BreadcrumbService,
        private _authService: AuthService,
        private _spinner: NgxSpinnerService
    ) {
        this._breadcrumbService.setItems([
            {label: 'Dashboard'},
        ]);
        this.role = JSON.parse(localStorage.getItem('role')) as Role;
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.institution = JSON.parse(localStorage.getItem('institution')) as Institution;
        this.permissions = JSON.parse(localStorage.getItem('permissions')) as Permission[];
        this.STORAGE_URL = environment.STORAGE_URL;
    }

    ngOnInit(): void {
        this.getShortcuts();
        this.showBirthday();
    }

    getShortcuts() {
        this._spinner.show();
        this._authService.get('shortcuts').subscribe(response => {
            this._spinner.hide();
            if (response) {
                this._spinner.hide();
                this.shortcuts = [];
                response['data'].forEach(permission => {
                    this.shortcuts.push({
                        id: permission.id,
                        image: permission.shortcut.image,
                        title: permission.route.label,
                        uri: permission.route.uri,
                        toolTip: permission.route.description,
                    });
                });
                this.shortcuts.sort(
                    (a, b) => {
                        if (a.title > b.title) {
                            return 1;
                        }
                        if (a.title < b.title) {
                            return -1;
                        }
                        return 0;
                    }
                );
                if (this.shortcuts.length === 0) {
                    this.msgs = [
                        {
                            severity: 'info',
                            summary: 'No tiene accesos directos disponibles',
                            detail: 'Consulte con el administrador'
                        },
                    ];
                }
            }
        }, error => {
            this._spinner.hide();
        });
    }

    showBirthday() {
        console.log('antes');
        if (!localStorage.getItem('birthday')) {
            console.log('entro1');
            if (this.user.birthdate.toString().substr(5, 5) === moment().format('MM-DD')) {
                console.log('entro2');
                this.randomNumber = Math.floor(Math.random() * (5 - 1) + 1);
                localStorage.setItem('birthday', 'true');
                this.flagBirhday = true;
            }
        }
    }


}
