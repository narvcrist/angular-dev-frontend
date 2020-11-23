import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    ajustes: Ajustes = {
        urlLogoMenu: 'assets/layout/images/logo-menu.png',
        urlLogoFooter: 'assets/layout/images/logo-footer.png',
        urlLogoTopBar: 'assets/layout/images/logo-topbar.png',
    };

    constructor(private http: HttpClient) {
        this.cargarAjustes();
    }

    guardarAjustes(ajustes: Ajustes) {
        localStorage.setItem('ajustes', JSON.stringify(ajustes));
        this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }

    cargarAjustes() {
        if (localStorage.getItem('ajustes')) {
            this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
        }
    }

    getIcons() {
        return this.http.get<any>('assets/pages/icons.json')
            .toPromise()
            .then(res => res.data )
            .then(data => data);
    }
}

interface Ajustes {
    urlLogoMenu?: string;
    urlLogoFooter?: string;
    urlLogoTopBar?: string;
}
