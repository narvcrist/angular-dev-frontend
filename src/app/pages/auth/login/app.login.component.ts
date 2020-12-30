import {Component} from '@angular/core';
import {ConfirmationService, Message} from 'primeng/api';
import {Permission, Role, User} from '../../../models/auth/models.index';
import {AuthService} from '../../../services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {IgnugService} from '../../../services/ignug/ignug.service';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Institution} from '../../../models/ignug/models.index';
import {element} from 'protractor';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    styleUrls: ['./login.component.scss']
})
export class AppLoginComponent {
    dark: boolean;
    checked: boolean;
    msgs: Message[];
    user: User;
    formLogin: FormGroup;
    formPasswordReset: FormGroup;
    formInstitutionRole: FormGroup;
    formChangePassword: FormGroup;
    roles: Role[];
    institutions: Institution[];
    permissions: Permission[];
    flagShowPassword: boolean;
    flagShowPasswordReset: boolean;
    STORAGE_URL: string = environment.STORAGE_URL;
    flagChangePassword: boolean;
    appName: string;
    appAcronym: string;

    constructor(private authService: AuthService,
                private ignugService: IgnugService,
                private _spinner: NgxSpinnerService,
                private router: Router,
                private _fb: FormBuilder,
                private _confirmationService: ConfirmationService) {
        this.buildFormLogin();
        this.buildFormInstitutionRole();
        this.buildFormChangePassword();
        this.roles = [];
        this.institutions = [];
        this.user = {};
        this.appName = environment.APP_NAME;
        this.appAcronym = environment.APP_ACRONYM;
    }

    buildFormLogin() {
        this.formLogin = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    buildFormChangePassword() {
        this.formChangePassword = this._fb.group({
            new_password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirm: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    checkPasswords() {
        return this.formChangePassword.controls['new_password'].value === this.formChangePassword.controls['password_confirm'].value;
    }

    buildFormInstitutionRole() {
        this.formInstitutionRole = this._fb.group({
            institution: ['', Validators.required],
            role: ['', Validators.required],
        });
    }

    onLoggedin() {
        this.msgs = [];
        const credentials = {
            client_id: environment.CLIENT_ID,
            client_secret: environment.CLIENT_SECRET,
            grant_type: environment.GRANT_TYPE,
            username: this.formLogin.controls['username'].value,
            password: this.formLogin.controls['password'].value
        };
        this._spinner.show();
        this.authService.login(credentials).subscribe(
            response => {
                localStorage.setItem('token', JSON.stringify(response));
                this.authService.resetAttempts(credentials.username).subscribe(response => {

                }, error => {
                    this.msgs = [{
                        severity: 'error',
                        summary: error.error.msg.summary,
                        detail: error.error.msg.detail,
                    }];
                });
                this.getUser();
            }, error => {
                this._spinner.hide();
                this.removeLogin();
                if (error.status === 401) {
                    this.authService.attempts(credentials.username).subscribe(response => {
                        this.msgs = [{
                            severity: 'error',
                            summary: response['msg']['summary'],
                            detail: response['msg']['detail']
                        }];
                    }, error => {
                        this.msgs = [{
                            severity: 'error',
                            summary: error.error.msg.summary,
                            detail: error.error.msg.detail,
                        }];
                    });
                    return;
                }
                this.msgs = [{
                    severity: 'error',
                    summary: error.error.msg.summary,
                    detail: error.error.msg.detail,
                }];
            });
    }

    getUser() {
        this.authService.getUser(this.formLogin.controls['username'].value).subscribe(
            response => {
                this._spinner.hide();
                let errors = false;
                this.user = response['data'];
                const roles = this.user['roles'];
                this.institutions = this.user['institutions'];
                this.msgs = [];
                // Error cuando no tiene asiganda una institucion
                if (this.institutions.length === 0) {
                    this.msgs.push({
                        severity: 'warn',
                        summary: 'No tiene una institucion asignada!',
                        detail: 'Comuníquese con el administrador!'
                    });
                    errors = true;
                }

                if (roles.length === 0) {
                    errors = true;
                }

                if (errors) {
                    return;
                }
                this.flagChangePassword = !this.user['change_password'];

                if (this.institutions.length === 1) {
                    this.formInstitutionRole.controls['institution'].setValue(this.institutions[0]);
                }

                if (this.institutions.length === 1 && roles.length === 1 && !this.flagChangePassword) {
                    this.formInstitutionRole.controls['role'].setValue(roles[0]);
                    this.getPermissions();
                }
            },
            error => {
                this._spinner.hide();
                this.removeLogin();
                this.msgs = [{
                    severity: 'error',
                    summary: error.error.msg.summary,
                    detail: error.error.msg.detail
                }];
            });
    }

    changePassword() {
        this.msgs = [];
        if (this.checkPasswords()) {
            this.user.password = this.formLogin.controls['password'].value;
            this.user.new_password = this.formChangePassword.controls['new_password'].value;
            this.user.password_confirm = this.formChangePassword.controls['password_confirm'].value;
            this._spinner.show();
            this.authService.changePassword('auth/change_password', {user: this.user}).subscribe(
                response => {
                    this._spinner.hide();
                    this.flagChangePassword = false;
                },
                error => {
                    this._spinner.hide();
                    this.msgs = [{
                        severity: 'error',
                        summary: error.error.msg.summary,
                        detail: error.error.msg.detail
                    }];
                });
        }
    }

    onSubmitLogin(event: Event) {
        event.preventDefault();
        if (this.formLogin.valid) {
            this.onLoggedin();
        } else {
            this.formLogin.markAllAsTouched();
        }
    }

    onSubmitChangePassword(event: Event) {
        event.preventDefault();
        if (this.formChangePassword.valid) {
            this.changePassword();
        } else {
            this.formChangePassword.markAllAsTouched();
        }
    }

    onSubmitContinue(event: Event) {
        event.preventDefault();
        if (this.formInstitutionRole.valid) {
            this.continueLogin();
        } else {
            this.formInstitutionRole.markAllAsTouched();
        }
    }

    removeLogin() {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('institution');
        localStorage.removeItem('permissions');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('token');
        localStorage.removeItem('requestURL');
    }

    continueLogin() {
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('institution', JSON.stringify(this.formInstitutionRole.controls['institution'].value));
        localStorage.setItem('role', JSON.stringify(this.formInstitutionRole.controls['role'].value));
        this.router.navigate(['/dashboard']);
    }

    resetFormInstitutionRole() {
        this.roles = [];
        this.institutions = [];
        this.msgs = [];
        this.buildFormInstitutionRole();
    }

    getRoles() {
        this.authService.post('users/roles', {
            institution_id: this.formInstitutionRole.controls['institution'].value['id'],
            user_id: this.user.id
        }).subscribe(response => {
            this.roles = response['data'];
            this.msgs = [];
        }, error => {
            this.roles = [];
            this.msgs = [{
                severity: 'warn',
                summary: 'No tiene un rol asignado para esta Institución!',
                detail: 'Comuníquese con el administrador!'
            }];
        })
    }

    getPermissions() {
        this._spinner.show();
        this.authService.post('users/permissions', {
            role_id: this.formInstitutionRole.controls['role'].value['id'],
            institution_id: this.formInstitutionRole.controls['institution'].value['id']
        }).subscribe(response => {
            this._spinner.hide();
            const permissions = response['data'];
            if (!permissions) {
                this.msgs = [{
                    severity: 'warn',
                    summary: 'No tiene permisos asignados!',
                    detail: 'Comuníquese con el administrador!'
                }];
            } else {
                this.msgs = [];
                localStorage.setItem('permissions', JSON.stringify(permissions));
                this.continueLogin();
            }
        }, error => {
            this._spinner.hide();
        });
    }
}
