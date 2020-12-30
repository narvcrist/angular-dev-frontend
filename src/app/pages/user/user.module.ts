// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UserRoutes} from './user.routing';

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
import {AutoCompleteModule} from 'primeng/autocomplete';
import {UserComponent} from './user/user.component';
import {PermissionRoleComponent} from './permission-role/permission-role.component';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PaginatorModule} from 'primeng/paginator';
import {KeyFilterModule} from 'primeng/keyfilter';
import { AdministrationComponent } from './administration/administration.component';
import {TabViewModule} from 'primeng/tabview';
import { AssignPermissionRoleComponent } from './assign-permission-role/assign-permission-role.component';
import {TreeModule} from 'primeng/tree';
import {AccordionModule} from 'primeng/accordion';
import {OverlayPanelModule} from 'primeng/overlaypanel';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        MessagesModule,
        MessageModule,
        DropdownModule,
        TooltipModule,
        AutoCompleteModule,

        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TableModule,
        RatingModule,
        DialogModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        TooltipModule,
        DropdownModule,
        PaginatorModule,
        KeyFilterModule,
        TabViewModule,
        TreeModule,
        AccordionModule,
        OverlayPanelModule
    ],
    declarations: [
        UserComponent,
        PermissionRoleComponent,
        AdministrationComponent,
        AssignPermissionRoleComponent
    ],
    providers: [ConfirmationService, MessageService]
})
export class UserModule {
}
