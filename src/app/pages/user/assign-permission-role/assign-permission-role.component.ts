import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Role, User} from '../../../models/auth/models.index';
import {HttpParams} from '@angular/common/http';
import {Paginator} from '../../../models/setting/paginator';
import {Condition} from '../../../models/setting/condition';
import {element} from 'protractor';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-assign-permission-role',
    templateUrl: './assign-permission-role.component.html',
    styleUrls: ['./assign-permission-role.component.scss']
})
export class AssignPermissionRoleComponent implements OnInit {
    roles: Role[];
    users: User[];
    conditions: Condition[];
    selectedUser: User;
    selectedRole: Role;
    filteredUsers: User[];

    constructor(private _authService: AuthService, private _spinnerService: NgxSpinnerService, private messageService: MessageService,) {
    }

    ngOnInit(): void {
        this.getRoles();
        this.getUsers();
    }

    getRoles() {
        this._spinnerService.show();
        this._authService.get('roles').subscribe(response => {
            this._spinnerService.hide();
            this.roles = response['data'];
        }, error => {
            this._spinnerService.hide();
        });
    }

    getUsers() {
        this._spinnerService.show();
        this._authService.post('roles/users', {conditions: this.conditions}).subscribe(response => {
            this._spinnerService.hide();
            this.users = response['data'];
        }, error => {
            this._spinnerService.hide();
        });
    }

    assignRole() {
        this._spinnerService.show();
        this._authService.post('roles/assign_role', {
            user_id: this.selectedUser.id,
            role_id: this.selectedRole.id
        }).subscribe(response => {
            this._spinnerService.hide();
            const indexRole = this.roles.indexOf(this.selectedRole);
            if (!this.roles[indexRole]['users'].find(element => element.id === this.selectedUser.id)) {
                this.roles[indexRole]['users'].push(this.selectedUser);
            } else {
                this.messageService.add({
                    key: 'msgToast',
                    severity: 'warn',
                    summary: 'El usuario ya tiene asignado el rol',
                    detail: 'Intente con otro usuario'
                });
            }
        }, error => {
            this._spinnerService.hide();
        });
    }

    removeRole(user) {
        this._spinnerService.show();
        this._authService.post('roles/remove_role', {
            user_id: user.id,
            role_id: this.selectedRole.id
        }).subscribe(response => {
            this._spinnerService.hide();
            const indexRole = this.roles.indexOf(this.selectedRole);
            this.roles[indexRole]['users'] = this.roles[indexRole]['users'].filter(element => element.id !== user.id);

        }, error => {
            this._spinnerService.hide();
        });
    }

    filterUser(event) {
        const filtered: User[] = [];
        const query = event.query;
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            if (
                user.username.toLowerCase().indexOf(query.toLowerCase()) === 0
                || user.first_lastname.toLowerCase().indexOf(query.toLowerCase()) === 0
                || user.second_lastname.toLowerCase().indexOf(query.toLowerCase()) === 0
                || user.first_name.toLowerCase().indexOf(query.toLowerCase()) === 0
                || user.second_name.toLowerCase().indexOf(query.toLowerCase()) === 0
            ) {
                filtered.push(user);
            }
        }

        this.filteredUsers = filtered;
    }
}
