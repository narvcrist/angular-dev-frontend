import {Component} from '@angular/core';
import {Role} from '../../models/auth/role';

@Component({
    selector: 'app-error',
    template: `
        <div class="exception-body error">
            <div class="exception-content">
                <div class="moon">
                    <img src="assets/layout/images/pages/asset-moon.svg" alt="mirage-layout"/>
                </div>
                <div class="exception-panel">
                    <div class="exception-panel-content">
                        <span class="tag"><i class="pi pi-exclamation-triangle" style="vertical-align: bottom"></i></span>
                        <h1>Página en Mantenimiento</h1>
                        <div class="seperator"></div>
                        <p>Disculpe las molestias, pero estamos realizando un mantenimiento en este momento.</p>
                        <button pButton type="button" icon="pi pi-home" *ngIf="role"
                                [routerLink]="['/dashboard']" label="Ir Dashboard"></button>
                    </div>
                </div>
                <div class="desert"></div>
            </div>
        </div>
    `,
})
export class AppUnderMaintenanceComponent {
    role: Role;

    constructor() {
        this.role = JSON.parse(localStorage.getItem('role')) as Role;
    }
}
