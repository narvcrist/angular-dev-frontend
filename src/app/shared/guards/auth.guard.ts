import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import {User} from '../../models/auth/user';
import {Role} from '../../models/auth/role';
import {AuthService} from '../../services/auth/auth.service';
import {Permission} from '../../models/auth/permission';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    user: User;
    role: Role;
    authPermissions: Permission[];

    constructor(private router: Router, private _authenticationService: AuthService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(next['_routerState']['url']);
/*         return true; */
        const requestURL = next['_routerState']['url'];
        this.user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user')) as User;
        this.role = localStorage.getItem('role') === null ? null : JSON.parse(localStorage.getItem('role')) as Role;
        this.authPermissions = localStorage.getItem('permissions') === null ? null :
            JSON.parse(localStorage.getItem('permissions')) as Permission[];
        if (this.user && this.role && this.authPermissions && localStorage.getItem('isLoggedin') === 'true') {
            if (requestURL === '/dashboard' || requestURL === '/') {
                return true;
            }
            const authRoute = this.authPermissions.find(element => element.route.uri === requestURL);
            if (authRoute === undefined) {
                this.router.navigate(['/auth/not-found']);
                return false;
            }
            if (authRoute.route.status.code === 'MAINTENANCE') {
                this.router.navigate(['/auth/under-maintenance']);
                return false;
            }
            if (authRoute) {
                return true;
            }
        }
        this.router.navigate(['/auth/access-denied']);
        return false;
    }
}
