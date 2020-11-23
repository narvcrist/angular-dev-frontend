// Angular Router
import {Routes} from '@angular/router';

// My Components
import {ProfileComponent} from './profile.component';

export const ProfileRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ProfileComponent
            }
        
        ]
    }
];
