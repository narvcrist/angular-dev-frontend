import {Component} from '@angular/core';
import {Role} from '../../models/auth/role';

@Component({
    selector: 'app-accessdenied',
    template: `
		<div class="exception-body access">
			<div class="exception-content">
				<div class="moon">
					<img src="assets/layout/images/pages/asset-moon.svg" alt="mirage-layout"/>
				</div>
				<div class="exception-panel">
					<div class="exception-panel-content">
						<span class="tag">401</span>
						<h1>Acceso Denegado</h1>
						<div class="seperator"></div>
						<p>No tienes los permisos necesarios. Por favor contacta con el administrador.</p>
						<button pButton type="button" icon="pi pi-sign-in" class="p-mr-6"
								[routerLink]="['/auth/login']"
								label="Ir Login"></button>
						<button pButton type="button" icon="pi pi-home" *ngIf="role"
								[routerLink]="['/dashboard']" label="Ir Dashboard"></button>
					</div>
				</div>
				<div class="desert"></div>
			</div>
		</div>
    `,
})
export class AppAccessdeniedComponent {
    role: Role;
    
    constructor() {
        this.role = localStorage.getItem('role') === null ? null : JSON.parse(localStorage.getItem('role')) as Role;
    }
    
}
