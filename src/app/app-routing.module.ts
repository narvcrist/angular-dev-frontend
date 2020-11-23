// Angular Modules
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

// Angular Components
import {AppMainComponent} from './shared/app.main.component';
import {AppBlankComponent} from './shared/app.blank.component';

// AuthGuard
import {AuthGuard} from './shared/auth.guard';
import {AppCrudComponent} from './pages/crud/app.crud.component';
import {AppUnderMaintenanceComponent} from './pages/auth/app.under-maintenance.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'crud',
                        component: AppCrudComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'profile',
                        loadChildren: () => import('./pages/auth/profile/profile.module').then(m => m.ProfileModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'attendance',
                        loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendanceModule),
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'auth/under-maintenance',
                        component: AppUnderMaintenanceComponent
                    },
                ]
            },
            {
                path: 'auth',
                component: AppBlankComponent,
                loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
            },
            {path: '**', redirectTo: '/auth/not-found'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
