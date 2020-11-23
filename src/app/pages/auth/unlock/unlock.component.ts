import {Component, OnInit} from '@angular/core';
import {ConfirmationService, Message} from 'primeng/api';
import {User} from '../../../models/auth/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-password-reset',
    templateUrl: './unlock.component.html',
    styleUrls: ['./unlock.component.scss']
})
export class UnlockComponent implements OnInit {
    dark: boolean;
    checked: boolean;
    msgs: Message[];
    user: User;
    formPasswordReset: FormGroup;
    flagShowPassword: boolean;
    
    constructor(private _authService: AuthService,
                private _spinner: NgxSpinnerService,
                private _router: Router,
                private _fb: FormBuilder,
                private _activatedRoute: ActivatedRoute,
                private _confirmationService: ConfirmationService) {
    }
    
    ngOnInit(): void {
        this.buildFormPasswordReset();
    }
    
    buildFormPasswordReset() {
        this.formPasswordReset = this._fb.group({
            token: [this._activatedRoute.snapshot.queryParams.token, Validators.required],
            username: [this._activatedRoute.snapshot.queryParams.username, Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirm: ['', [Validators.required, Validators.minLength(6)]],
        });
    }
    
    onSubmitResetPassword(event: Event) {
        event.preventDefault();
        if (this.formPasswordReset.valid) {
            this.resetPassword();
        } else {
            this.formPasswordReset.markAllAsTouched();
        }
    }
    
    resetPassword() {
        if (this.checkPasswords()) {
            this._spinner.show();
            const credentials = {
                password: this.formPasswordReset.controls['password'].value,
                password_confirm: this.formPasswordReset.controls['password_confirm'].value,
                token: this.formPasswordReset.controls['token'].value,
            };
            this._authService.unlock(credentials).subscribe(
                response => {
                    this._spinner.hide();
                    this.msgs = [{
                        severity: 'success',
                        summary: response['msg']['summary'],
                        detail: response['msg']['detail']
                    }];
                }, error => {
                    this._spinner.hide();
                    this.msgs = [{
                        severity: 'error',
                        summary: error.error.msg.summary,
                        detail: error.error.msg.detail
                    }];
                });
        }
    }
    
    checkPasswords() {
        return this.formPasswordReset.controls['password'].value === this.formPasswordReset.controls['password_confirm'].value;
    }
}
