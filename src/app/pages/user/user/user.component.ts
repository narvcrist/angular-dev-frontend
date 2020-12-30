import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Paginator} from '../../../models/setting/paginator';
import {User} from '../../../models/auth/user';
import {Col} from '../../../models/setting/col';
import {Condition} from '../../../models/setting/condition';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, Message, MessageService, TreeNode} from 'primeng/api';
import {BreadcrumbService} from '../../../shared/breadcrumb.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpParams} from '@angular/common/http';
import {Institution} from '../../../models/ignug/institution';
import {IgnugService} from '../../../services/ignug/ignug.service';
import {element} from 'protractor';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    paginator: Paginator;
    dialog: boolean;
    dialogPermissionRole: boolean;
    dialogInstitutions: boolean;
    users: User[];
    user: User;
    selectedUsers: User[];
    cols: Col[];
    selectedCol: Col;
    conditions: Condition[];
    rowsPerPageOptions: number[];
    form: FormGroup;
    validatorsOptions: any;
    username: string;
    flagUser: boolean;
    msgs: Message[];
    institution: Institution;

    constructor(private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private breadcrumbService: BreadcrumbService,
                private _authService: AuthService,
                private _ignugService: IgnugService,
                private _spinnerService: NgxSpinnerService,
                private _fb: FormBuilder,
    ) {
        this.breadcrumbService.setItems([
            {label: 'Dashboard', routerLink: ['/dashboard']},
            {label: 'Crud'}
        ]);
        this.paginator = {current_page: 1, per_page: 5};
        this.rowsPerPageOptions = [5, 10, 20, 30, 50];
        this.validatorsOptions = {
            identification: {minlength: 9, maxlength: 13},
            first_name: {minlength: 3, maxlength: 25},
            second_name: {minlength: 3, maxlength: 25},
            first_lastname: {minlength: 3, maxlength: 25},
            second_lastname: {minlength: 3, maxlength: 25},
            email: {maxlength: 50},
        };
        this.institution = JSON.parse(localStorage.getItem('institution')) as Institution;
    }

    ngOnInit() {
        this.buildForm();
        this.cols = [
            {field: 'identification', header: 'Número de Documento'},
            {field: 'first_lastname', header: 'Primer Apellido'},
            {field: 'second_lastname', header: 'Segundo Apellido'},
            {field: 'first_name', header: 'Primer Nombre'},
            {field: 'second_name', header: 'Segundo Nombre'},
            {field: 'email', header: 'Correo Electrónico'}
        ];
        this.selectedCol = this.cols[0];
        this.getUsers();
    }

    buildForm() {
        this.form = this._fb.group({
            id: [],
            identification: ['', [
                Validators.required,
                Validators.minLength(this.validatorsOptions.identification.minlength),
                Validators.maxLength(this.validatorsOptions.identification.maxlength)]],
            username: ['', [
                Validators.required,
                Validators.minLength(this.validatorsOptions.identification.minlength),
                Validators.maxLength(this.validatorsOptions.identification.maxlength)]],
            first_name: ['', [
                Validators.required,
                Validators.minLength(this.validatorsOptions.first_name.minlength),
                Validators.maxLength(this.validatorsOptions.first_name.maxlength)]],
            second_name: ['', [
                Validators.required,
                Validators.minLength(this.validatorsOptions.second_name.minlength),
                Validators.maxLength(this.validatorsOptions.second_name.maxlength)]],
            first_lastname: ['', [
                Validators.required,
                Validators.minLength(this.validatorsOptions.first_lastname.minlength),
                Validators.maxLength(this.validatorsOptions.second_lastname.maxlength)]],
            second_lastname: ['', [
                Validators.required,
                Validators.minLength(this.validatorsOptions.second_lastname.minlength),
                Validators.maxLength(this.validatorsOptions.second_lastname.maxlength)]],
            email: ['', [
                Validators.required,
                Validators.email,
                Validators.maxLength(this.validatorsOptions.email.maxlength)]],
            roles: [''],
            institutions: [''],
        });
    }

    getUsers() {
        this._spinnerService.show();
        const params = new HttpParams().append('page', this.paginator.current_page.toString())
            .append('per_page', this.paginator.per_page.toString());
        this._authService.post('users/filters', {conditions: this.conditions}, params).subscribe(response => {
            this._spinnerService.hide();
            this.users = response['data'];
            this.paginator = response as Paginator;
            this.paginator.per_page = Number(this.paginator.per_page);
        }, error => {
            this._spinnerService.hide();
        });
    }

    openModal(user: User) {
        if (user) {
            this.form.controls['id'].setValue(user.id);
            this.form.controls['username'].setValue(user.username);
            this.form.controls['identification'].setValue(user.identification);
            this.form.controls['first_name'].setValue(user.first_name);
            this.form.controls['second_name'].setValue(user.second_name);
            this.form.controls['first_lastname'].setValue(user.first_lastname);
            this.form.controls['second_lastname'].setValue(user.second_lastname);
            this.form.controls['email'].setValue(user.email);
            this.form.controls['roles'].setValue(user.roles);
            this.form.controls['institutions'].setValue(user.institutions);
        } else {
            this.form.reset();
        }
        this.dialog = true;
    }

    openModalPermissionRole(user: User) {
        if (user) {
            this.form.controls['id'].setValue(user.id);
            this.form.controls['identification'].setValue(user.identification);
            this.form.controls['first_name'].setValue(user.first_name);
            this.form.controls['second_name'].setValue(user.second_name);
            this.form.controls['first_lastname'].setValue(user.first_lastname);
            this.form.controls['second_lastname'].setValue(user.second_lastname);
            this.form.controls['email'].setValue(user.email);
            this.form.controls['roles'].setValue(user.roles);
            this.form.controls['institutions'].setValue(user.institutions);
        } else {
            this.form.reset();
        }
        this.dialogPermissionRole = true;
    }

    openModalInstitutions(user: User) {
        if (user) {
            this.form.controls['id'].setValue(user.id);
            this.form.controls['identification'].setValue(user.identification);
            this.form.controls['first_name'].setValue(user.first_name);
            this.form.controls['second_name'].setValue(user.second_name);
            this.form.controls['first_lastname'].setValue(user.first_lastname);
            this.form.controls['second_lastname'].setValue(user.second_lastname);
            this.form.controls['email'].setValue(user.email);
            this.form.controls['roles'].setValue(user.roles);
            this.form.controls['institutions'].setValue(user.institutions);
        } else {
            this.form.reset();
        }
        this.dialogInstitutions = true;
    }

    create() {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000});
    }

    update() {
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'user Updated', life: 3000});
    }

    deleteSelected() {
        if (this.selectedUsers && this.selectedUsers.length > 0) {
            this.confirmationService.confirm({
                message: 'Are you sure you want to delete the selected?',
                header: 'Confirm',
                icon: 'pi pi-exclamation-triangle',
                rejectButtonStyleClass: 'p-button-text',
                accept: () => {
                    this.users = this.users.filter(element => !this.selectedUsers.includes(element));
                    this.selectedUsers = null;
                    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000});
                }
            });
        } else {
            this.messageService.add({severity: 'error', summary: 'Debe seleccionar al menos un registro', detail: 'Deleted', life: 3000});
        }
    }

    delete(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + user.first_name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this.users = this.users.filter(element => element.id !== user.id);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000});
            }
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.form.valid) {
            if (this.form.controls['id'].value === null) {
                this.create();
            } else {
                this.update();
            }
            this.dialog = false;
        } else {
            this.form.markAllAsTouched();
        }
    }

    paginate(event) {
        this.paginator.current_page = event.page + 1;
        this.paginator.per_page = event.rows;
        this.getUsers();
    }

    search(event, inputSearch) {
        if (inputSearch.length > 0 && event.key !== 'Backspace') {
            this.conditions = [{field: this.selectedCol.field, logic_operator: 'ilike', match_mode: 'contains', value: inputSearch}];
            this.getUsers();
        } else if (inputSearch.length === 0) {
            this.conditions = null;
            this.getUsers();
        }

    }

    selectColSearch(col) {
        this.selectedCol = col;
    }

    validateUser() {
        this._spinnerService.show();
        this._authService.get('users/' + this.username).subscribe(response => {
            this._spinnerService.hide();
            let flag = false;
            if (response['data'] == null) {
                this.form.reset();
                this.dialog = true;
                this.flagUser = false;
                this.msgs = [];
                this.form.controls['identification'].setValue(this.username);
                this.form.controls['username'].setValue(this.username);
            } else {
                const institutions = response['data']['institutions'];
                institutions.forEach(institution => {
                    if (institution.id === this.institution.id) {
                        this.msgs = [{
                            severity: 'warn',
                            summary: 'El usuario ya se encuentra registrado',
                            detail: ''
                        }];
                        flag = true;
                        this.flagUser = false;
                    }
                });
                if (!flag) {
                    this.form.patchValue(response['data']);
                    this.flagUser = true;
                    this.msgs = [{
                        severity: 'info',
                        summary: 'Haga click en Vincular para agregar a su Institución',
                        detail: ''
                    }];
                }
            }
        }, error => {
            this._spinnerService.hide();
        });
    }

    assignInstitution() {
        this._spinnerService.show();
        this._ignugService.post('institutions/assign_institution', {
            user_id: this.form.controls['id'].value,
            institution_id: this.institution.id
        }).subscribe(response => {
            this._spinnerService.hide();
            this.getUsers();
            this.msgs = [];
            this.flagUser = false;
        }, error => {
            this._spinnerService.hide();
        });
    }

    removeInstitution(user) {
        this._spinnerService.show();
        this._ignugService.post('institutions/remove_institution', {
            user_id: user.id,
            institution_id: this.institution.id
        }).subscribe(response => {
            this._spinnerService.hide();
            this.users = this.users.filter(element => element !== user);

        }, error => {
            this._spinnerService.hide();
        });
    }
}
