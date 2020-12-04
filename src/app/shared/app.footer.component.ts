import {Component} from '@angular/core';
import {Institution} from '../models/ignug/institution';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-footer',
    template: `
		<div class="layout-footer">
			<div class="logo-text">
				<img [src]="STORAGE_URL+institution.logo" alt="mirage-layout"/>
				<div class="text">
					<h1 class="hide">&reg; {{institution.denomination}} {{institution.name}}</h1>
					<span> &copy;
						{{currentYear}} Todos los derechos reservados.
                        <b class="hide">{{appName}} ({{appAcronym}} V{{appVersion}})</b>
                    </span>
					<br>
					<span class="hide">Iconos diseñados por
                        <a href="https://www.flaticon.es/autores/monkik" target="_blank" title="monkik">
                            monkik
                        </a>
                        from
                        <a href="https://www.flaticon.es/" title="Flaticon" target="_blank">
                            www.flaticon.es
                        </a>
                    </span>
				</div>
			</div>
			<div class="icons">
				<div class="icon icon-hastag">
					<i class="pi pi-home"></i>
				</div>
				<div class="icon icon-twitter">
					<i class="pi pi-globe"></i>
				</div>
				<div class="icon icon-prime">
					<i class="pi pi-bookmark"></i>
				</div>
			</div>
		</div>
    `
})
export class AppFooterComponent {
    institution: Institution;
    STORAGE_URL: string;
    appName: string;
    appAcronym: string;
    appVersion: string;
    currentYear: number;
    
    constructor() {
        this.institution = localStorage.getItem('institution') === null ? null :
            JSON.parse(localStorage.getItem('institution')) as Institution;
        this.STORAGE_URL = environment.STORAGE_URL;
        this.appName = environment.APP_NAME;
        this.appAcronym = environment.APP_ACRONYM;
        this.appVersion = environment.APP_VERSION;
        this.currentYear = new Date().getFullYear();
    }
    
}
