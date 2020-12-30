import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {Permission} from '../models/auth/permission';
import {AuthService} from '../services/auth/auth.service';
import {TYPE_MENUS} from '../../environments/catalogues';
import {Institution} from '../models/ignug/institution';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-sidebar" [ngClass]="{'layout-sidebar-active': app.sidebarActive}" (click)="app.onSidebarClick($event)"
             (mouseover)="app.sidebarActive=true" (mouseleave)="app.sidebarActive=false">
            <div class="sidebar-logo">
                <a href="#" class="sidebar-pin" title="Toggle Menu" (click)="app.onToggleMenuClick($event)">
                    <i class="pi pi-lock" *ngIf="app.staticMenuActive"></i>
                    <i class="pi pi-lock-open" *ngIf="!app.staticMenuActive"></i>
                </a>
                <a routerLink="/">
                    <img alt="logo" [src]="STORAGE_URL+institution.logo"/>
                    <span class="app-name">{{institution.short_name}}</span>
                </a>
            </div>

            <div class="layout-menu-container" (click)="onMenuClick()">
                <ul class="layout-menu">
                    <li app-menuitem *ngFor="let item of menus; let i = index;" [item]="item" [index]="i" [root]="true"></li>
                </ul>
            </div>
        </div>
    `
})
export class AppMenuComponent implements OnInit {
    menus: any[];
    permissions: Permission[];
    institution: Institution;
    STORAGE_URL: string;
    appAcronym: string;

    constructor(public app: AppMainComponent, private _authService: AuthService) {
        this.institution = localStorage.getItem('institution') === null ? null :
            JSON.parse(localStorage.getItem('institution')) as Institution;
        this.STORAGE_URL = environment.STORAGE_URL;
        this.appAcronym = environment.APP_ACRONYM;
    }

    ngOnInit() {
        this.getMenus();
    }

    onMenuClick() {
        this.app.menuClick = true;
    }

    getMenus() {
        this.permissions = localStorage.getItem('permissions') === null ? null :
            JSON.parse(localStorage.getItem('permissions')) as Permission[];
        this.menus = [{module: 0, label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/dashboard']}];
        if (this.permissions) {
            this.permissions.forEach(permission => {
                const moduleIndex = this.menus.findIndex(menu => menu.module === permission.route.module.id);
                if (permission.route.type.code === TYPE_MENUS.MENU) {
                    if (moduleIndex === -1) {
                        this.menus.push(
                            {
                                module: permission.route.module.id,
                                label: permission.route.module.name,
                                icon: permission.route.module.icon,
                                items: [
                                    {label: permission.route.label, icon: permission.route.icon, routerLink: [permission.route.uri]},
                                ]
                            }
                        );
                    } else {
                        this.menus[moduleIndex]['items'].push(
                            {label: permission.route.label, icon: permission.route.icon, routerLink: [permission.route.uri]},
                        );

                    }
                }
            });
        }
    }
}
