// Angular Router
import {Routes} from '@angular/router';

// My Components
import {AdministrationComponent} from './administration/administration.component';

export const UserRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'administration',
                component: AdministrationComponent
            },
        ]
    }
];
