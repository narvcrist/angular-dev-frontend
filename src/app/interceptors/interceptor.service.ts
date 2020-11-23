import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';
import {Token} from '../models/auth/token';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {tryCatch} from 'rxjs/internal-compatibility';
import {URL} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private _authService: AuthService, private _router: Router, private _spinner: NgxSpinnerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers;
        let params;
        if (localStorage.getItem('token')) {
            headers = new HttpHeaders().append('Accept', 'application/json')
                .append('Authorization', 'Bearer ' + (JSON.parse(localStorage.getItem('token')) as Token).access_token);
            if (!req.params.has('page')) {
                params = new HttpParams().append('page', '1');
            }
        } else {
            headers = new HttpHeaders().append('Accept', 'application/json');
            params = new HttpParams().append('page', '1');
        }
        if (req.url === URL + 'api/logs') {
            return next.handle(req.clone({headers})).pipe(catchError(error => {
                return throwError(error);
            }));
        }
        return next.handle(req.clone({headers, params})).pipe(catchError(error => {
            if (error.status === 4030 || error.status === 4040 || error.status === 4230) {
                this._authService.removeLogin();
                this._router.navigate(['/auth/login']);
            }

            if (error.status !== 401 && error.status !== 404) {
                this._authService.logs(error);
            }
            return throwError(error);
        }));
    }

    errors(error: HttpErrorResponse) {
        if (error.status === 4030 || error.status === 4040 || error.status === 4230) {
            this._authService.removeLogin();
            this._router.navigate(['/auth/login']);
        }
        this._authService.logs(error);
        return throwError(error);
    }
}
