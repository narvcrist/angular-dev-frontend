// Angular Router
import {Routes} from '@angular/router';

// My Components
import {AppNotfoundComponent} from './app.notfound.component';
import {AppAccessdeniedComponent} from './app.accessdenied.component';
import {AppUnderMaintenanceComponent} from './app.under-maintenance.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {PasswordForgotComponent} from './password-forgot/password-forgot.component';
import {AppLoginComponent} from './login/app.login.component';
import {UserUnlockComponent} from './user-unlock/user-unlock.component';
import {UnlockComponent} from './unlock/unlock.component';

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'not-found',
                component: AppNotfoundComponent
            },
            {
                path: 'access-denied',
                component: AppAccessdeniedComponent
            },
            {
                path: 'under-maintenance',
                component: AppUnderMaintenanceComponent
            },
            {
                path: 'login',
                component: AppLoginComponent
            },
            {
                path: 'password-reset',
                component: PasswordResetComponent
            },
            {
                path: 'password-forgot',
                component: PasswordForgotComponent
            },
            {
                path: 'user-unlock',
                component: UserUnlockComponent
            },
            {
                path: 'unlock',
                component: UnlockComponent
            },
        
        ]
    }
];
