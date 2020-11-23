// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProfileRoutes} from './profile.routing';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmationService, MessageService} from 'primeng/api';
// My Components
import {TooltipModule} from 'primeng/tooltip';
import {ProfileComponent} from './profile.component';
import {CardModule} from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProfileRoutes),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        MessagesModule,
        MessageModule,
        DropdownModule,
        TooltipModule,
        CardModule,
    
    ],
    declarations: [
        ProfileComponent,
    ],
    providers: [ConfirmationService, MessageService]
})
export class ProfileModule {
}
