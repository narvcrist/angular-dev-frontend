import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// PrimeNG Modules
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CalendarModule} from 'primeng/calendar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';

// Application Components
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppMainComponent} from './shared/app.main.component';
import {AppMenuComponent} from './shared/app.menu.component';
import {AppMenuitemComponent} from './shared/app.menuitem.component';
import {AppBreadcrumbComponent} from './shared/app.breadcrumb.component';
import {AppConfigComponent} from './shared/app.config.component';
import {AppRightPanelComponent} from './shared/app.rightpanel.component';
import {AppTopBarComponent} from './shared/app.topbar.component';
import {AppFooterComponent} from './shared/app.footer.component';

// Application services
import {BreadcrumbService} from './shared/breadcrumb.service';
import {MenuService} from './shared/app.menu.service';
import {AppCodeModule} from './shared/app.code.component';
import {InputTextModule} from 'primeng/inputtext';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AppBlankComponent} from './shared/app.blank.component';
import {AppCrudComponent} from './pages/crud/app.crud.component';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ProductService} from './demo/service/productservice';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InterceptorService} from './interceptors/interceptor.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AppCodeModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BreadcrumbModule,
        CalendarModule,
        RadioButtonModule,
        InputSwitchModule,
        InputTextModule,
        CheckboxModule,
        NgxSpinnerModule,
        
        // temporales
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
        KeyFilterModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppBlankComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppRightPanelComponent,
        AppConfigComponent,
        AppBreadcrumbComponent,
        AppCrudComponent,
        TableDemoComponent,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
        {provide: LocationStrategy, useClass: HashLocationStrategy}, MenuService, BreadcrumbService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
