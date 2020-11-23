import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Role, Token, User} from '../../models/auth/models.index';
import {Router} from '@angular/router';
import {SYSTEMS} from '../../../environments/catalogues';
import {URL} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Log} from '../../models/log';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    log: Log;

    constructor(private _http: HttpClient, private router: Router) {
    }

    login(credentials: any) {
        const url = URL + 'oauth/token';
        return this._http.post(url, credentials);
    }

    attempts(username: string) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/attempts/' + username;
        return this._http.get(url);
    }

    resetAttempts(username: string) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/reset_attempts/' + username;
        return this._http.get(url);
    }

    forgotPassword(username: any) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/forgot_password';
        return this._http.post(url, {username});
    }

    resetPassword(credentials: any) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/reset_password';
        return this._http.post(url, credentials);
    }

    userUnlock(username: any) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/user_unlock';
        return this._http.post(url, {username});
    }


    transctionalCode(username: any) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/transactional_code/' + username;
        return this._http.get(url);
    }

    unlock(credentials: any) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/unlock';
        return this._http.post(url, credentials);
    }

    getUser(username: string) {
        const url = environment.API_URL_AUTHENTICATION
            + 'users/' + username + '?system_code=' + SYSTEMS.IGNUG;
        return this._http.get(url);
    }

    logout() {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout';
        const role = (JSON.parse(localStorage.getItem('role')) as Role).code;

        return this._http.get(url);
    }

    logoutAll() {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout_all?user_id=' + (JSON.parse(localStorage.getItem('user')) as User).id;
        const role = (JSON.parse(localStorage.getItem('role')) as Role).code;
        return this._http.get(url).subscribe(response => {
            this.removeLogin();
            this.router.navigate(['/auth/login-' + role]);
        }, error => {
            alert(error);
        });
    }

    get(url: string) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.get(url);
    }

    post(url: string, data: any) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.post(url, data);
    }

    update(url: string, data: any) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.put(url, data);
    }

    delete(url: string) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.delete(url);
    }

    changePassword(url: string, data: any) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.put(url, data);
    }

    logs(error: HttpErrorResponse) {
        const log = {
            code: error.error.msg.code,
            summary: error.error.msg.summary,
            detail: error.error.msg.detail,
            data: error.error.data,
            status: error.status,
            message: error.message,
            url: error.url,
            user_id: localStorage.getItem('user') === null ? null : (JSON.parse(localStorage.getItem('user')) as User).id
        };
        const url = URL + 'api/logs';
        return this._http.post(url, log).subscribe();
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
}
