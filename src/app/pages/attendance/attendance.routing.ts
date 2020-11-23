import {Routes} from '@angular/router';
import {AttendanceComponent} from './attendance/attendance.component';
import {AdministrationComponent} from './administration/administration.component';
import {AuthGuard} from '../../shared/auth.guard';

export const AttendanceRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: AttendanceComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'administration',
                component: AdministrationComponent,
                canActivate: [AuthGuard]
            },
        ]
    }
];
