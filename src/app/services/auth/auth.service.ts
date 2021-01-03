import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Role, User} from '../../models/auth/models.index';
import {Router} from '@angular/router';
import {SYSTEMS} from '../../../environments/catalogues';
import {URL} from '../../../environments/environment';
import {Log} from '../../models/log';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    log: Log;

    constructor(private _http: HttpClient, private router: Router) {
    }

    login(credentials: any, params = new HttpParams()) {
        const url = URL + 'oauth/token';
        return this._http.post(url, credentials, {params});
    }

    attempts(username: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/attempts/' + username;
        return this._http.get(url, {params});
    }

    resetAttempts(username: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/reset_attempts/' + username;
        return this._http.get(url, {params});
    }

    forgotPassword(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/forgot_password';
        return this._http.post(url, {username}, {params});
    }

    resetPassword(credentials: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/reset_password';
        return this._http.post(url, credentials, {params});
    }

    userUnlock(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/user_unlock';
        return this._http.post(url, {username}, {params});
    }

    transctionalCode(username: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/transactional_code/' + username;
        return this._http.get(url, {params});
    }

    unlock(credentials: any, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/unlock';
        return this._http.post(url, credentials, {params});
    }

    getUser(username: string, params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'users/' + username;
        return this._http.get(url, {params});
    }

    logout(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout';
        return this._http.get(url, {params});
    }

    logoutAll(params = new HttpParams()) {
        const url = environment.API_URL_AUTHENTICATION + 'auth/logout_all?user_id=' + (JSON.parse(localStorage.getItem('user')) as User).id;
        const role = (JSON.parse(localStorage.getItem('role')) as Role).code;
        return this._http.get(url, {params}).subscribe(response => {
            this.removeLogin();
            this.router.navigate(['/auth/login-' + role]);
        }, error => {
            alert(error);
        });
    }

    get(url: string, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.get(url, {params});
    }

    post(url: string, data: any, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.post(url, data, {params});
    }

    update(url: string, data: any, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.put(url, data, {params});
    }

    delete(url: string, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.delete(url, {params});
    }

    changePassword(url: string, data: any, params = new HttpParams()) {
        url = environment.API_URL_AUTHENTICATION + url;
        return this._http.put(url, data, {params});
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
    }
}
