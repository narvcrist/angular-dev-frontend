import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AuthService} from '../services/auth/auth.service';
import {User, Role, Permission} from '../models/auth/models.index';
import {ROLES, TYPE_MENUS, TYPE_SEXS} from '../../environments/catalogues';
import {Institution} from '../models/ignug/institution';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-topbar',
    template: `
		<div class="layout-topbar">
			<div class="layout-topbar-wrapper">
				<div class="layout-topbar-left">
					<!-- Logo y nomobre del sistema -->
					<div class="layout-topbar-logo-wrapper">
						<a href="/asd" class="layout-topbar-logo">
							<img [src]="STORAGE_URL+institution.logo" alt="mirage-layout"/>
							<span class="app-name">{{institution.acronym}}</span>
						</a>
					</div>

					<!-- Abre el menu izquiero en telefonos -->
					<a href="#" class="sidebar-menu-button" (click)="app.onMenuButtonClick($event)">
						<i class="pi pi-bars"></i>
					</a>

					<!-- Abre el mega menu en telefonos -->
					<a href="#" class="megamenu-mobile-button" (click)="app.onMegaMenuMobileButtonClick($event)">
						<i class="pi pi-align-right megamenu-icon"></i>
					</a>

					<!-- Abre el perfil de usuario en telefonos -->
					<a href="#" class="topbar-menu-mobile-button" (click)="app.onTopbarMobileMenuButtonClick($event)">
						<i class="pi pi-ellipsis-v"></i>
					</a>
					<!-- Mega menu -->
					<div class="layout-megamenu-wrapper">
						<a class="layout-megamenu-button" href="#" (click)="app.onMegaMenuButtonClick($event)">
							<i class="pi pi-comment"></i>
							Mega Menu
						</a>
						<ul class="layout-megamenu" [ngClass]="{'layout-megamenu-active fadeInDown': app.megaMenuActive}"
							(click)="app.onMegaMenuClick($event)">
							<li *ngFor="let megaMenu of megaMenus" [ngClass]="{'active-topmenuitem': activeItem === 1}"
								(click)="mobileMegaMenuItemClick(1)">
								<a href="#">{{megaMenu.label}} <i class="pi pi-angle-down"></i></a>
								<ul>
									<li class="active-row" *ngFor="let menu of megaMenu.items" [routerLink]="[menu.routerLink]">
										<i class="pi pi-circle-on"></i>
										<span>
                                        <h5>{{menu.label}}</h5>
                                        <span>{{menu.description}}</span>
                                    </span>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div class="layout-topbar-right fadeInDown">
					<ul class="layout-topbar-actions">
<!--						<li #search class="search-item topbar-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === search}">-->
<!--							<a href="#" class="topbar-search-mobile-button" (click)="app.onTopbarItemClick($event,search)">-->
<!--								<i class="topbar-icon pi pi-search"></i>-->
<!--							</a>-->
<!--							<ul class="search-item-submenu fadeInDown" (click)="app.topbarItemClick = true">-->
<!--								<li>-->
<!--                                    <span class="md-inputfield search-input-wrapper">-->
<!--                                        <input pInputText placeholder="Search..."/>-->
<!--                                        <i class="pi pi-search"></i>-->
<!--                                    </span>-->
<!--								</li>-->
<!--							</ul>-->
<!--						</li>-->
<!--						<li #calendar class="topbar-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === calendar}">-->
<!--							<a href="#" (click)="app.onTopbarItemClick($event,calendar)">-->
<!--                                <span class="p-overlay-badge">-->
<!--                                    <i class="topbar-icon pi pi-calendar" style="font-size: 2em"></i>-->
<!--                                    <span class="p-badge">1</span>-->
<!--                                </span>-->
<!--							</a>-->
<!--							<ul class="fadeInDown" (click)="app.topbarItemClick = true">-->
<!--								<li class="layout-submenu-header">-->
<!--									<h1>Calendar</h1>-->
<!--								</li>-->
<!--								<li class="calendar">-->
<!--									<p-calendar [inline]="true"></p-calendar>-->
<!--								</li>-->
<!--							</ul>-->
<!--						</li>-->
<!--						<li #message class="topbar-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === message}">-->
<!--							<a href="#" (click)="app.onTopbarItemClick($event,message)">-->
<!--								<span class="p-overlay-badge">-->
<!--                                    <i class="topbar-icon pi pi-envelope" style="font-size: 2em"></i>-->
<!--                                    <span class="p-badge">5</span>-->
<!--                                </span>-->
<!--							</a>-->
<!--							<ul class="fadeInDown">-->
<!--								<li class="layout-submenu-header">-->
<!--									<h1>Messages</h1>-->
<!--									<span>Today, you have new 4 messages</span>-->
<!--								</li>-->
<!--								<li class="layout-submenu-item">-->
<!--									<img src="assets/layout/images/topbar/avatar-cayla.png" alt="mirage-layout" width="35"/>-->
<!--									<div class="menu-text">-->
<!--										<p>Override the digital divide</p>-->
<!--										<span>Cayla Brister</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
<!--								<li class="layout-submenu-item">-->
<!--									<img src="assets/layout/images/topbar/avatar-gabie.png" alt="mirage-layout" width="35"/>-->
<!--									<div class="menu-text">-->
<!--										<p>Nanotechnology immersion</p>-->
<!--										<span>Gabie Sheber</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
<!--								<li class="layout-submenu-item">-->
<!--									<img src="assets/layout/images/topbar/avatar-gaspar.png" alt="mirage-layout" width="35"/>-->
<!--									<div class="menu-text">-->
<!--										<p>User generated content</p>-->
<!--										<span>Gaspar Antunes</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
<!--								<li class="layout-submenu-item">-->
<!--									<img src="assets/layout/images/topbar/avatar-tatiana.png" alt="mirage-layout" width="35"/>-->
<!--									<div class="menu-text">-->
<!--										<p>The holistic world view</p>-->
<!--										<span>Tatiana Gagelman</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
<!--							</ul>-->
<!--						</li>-->
<!--						<li #gift class="topbar-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === gift}">-->
<!--							<a href="#" (click)="app.onTopbarItemClick($event,gift)">-->
<!--								<span class="p-overlay-badge">-->
<!--                                    <i class="topbar-icon pi pi-bell" style="font-size: 2em"></i>-->
<!--                                    <span class="p-badge">2</span>-->
<!--                                </span>-->
<!--							</a>-->
<!--							<ul class="fadeInDown">-->
<!--								<li class="layout-submenu-header">-->
<!--									<h1>Notificaciones</h1>-->
<!--								</li>-->

<!--								<li class="deals">-->
<!--									<ul>-->
<!--										<li>-->
<!--											<img src="assets/layout/images/topbar/deal-icon-sapphire.png" alt="mirage-layout" width="35"/>-->
<!--											<div class="menu-text">-->
<!--												<p>Sapphire</p>-->
<!--												<span>Angular</span>-->
<!--											</div>-->
<!--											<i class="pi pi-angle-right"></i>-->
<!--										</li>-->
<!--										<li>-->
<!--											<img src="assets/layout/images/topbar/deal-icon-roma.png" alt="mirage-layout" width="35"/>-->
<!--											<div class="menu-text">-->
<!--												<p>Roma</p>-->
<!--												<span>Minimalism</span>-->
<!--											</div>-->
<!--											<i class="pi pi-angle-right"></i>-->
<!--										</li>-->
<!--										<li>-->
<!--											<img src="assets/layout/images/topbar/deal-icon-babylon.png" alt="mirage-layout" width="35"/>-->
<!--											<div class="menu-text">-->
<!--												<p>Babylon</p>-->
<!--												<span>Powerful</span>-->
<!--											</div>-->
<!--											<i class="pi pi-angle-right"></i>-->
<!--										</li>-->
<!--									</ul>-->
<!--									<ul>-->
<!--										<li>-->
<!--											<img src="assets/layout/images/topbar/deal-icon-harmony.png" alt="mirage-layout" width="35"/>-->
<!--											<div class="menu-text">-->
<!--												<p>Harmony</p>-->
<!--												<span>USWDS</span>-->
<!--											</div>-->
<!--											<i class="pi pi-angle-right"></i>-->
<!--										</li>-->
<!--										<li>-->
<!--											<img src="assets/layout/images/topbar/deal-icon-prestige.png" alt="mirage-layout" width="35"/>-->
<!--											<div class="menu-text">-->
<!--												<p>Prestige</p>-->
<!--												<span>Elegancy</span>-->
<!--											</div>-->
<!--											<i class="pi pi-angle-right"></i>-->
<!--										</li>-->
<!--										<li>-->
<!--											<img src="assets/layout/images/topbar/deal-icon-ultima.png" alt="mirage-layout" width="35"/>-->
<!--											<div class="menu-text">-->
<!--												<p>Ultima</p>-->
<!--												<span>Material</span>-->
<!--											</div>-->
<!--											<i class="pi pi-angle-right"></i>-->
<!--										</li>-->
<!--									</ul>-->
<!--								</li>-->
<!--							</ul>-->
<!--						</li>-->

						<!-- Perfil principal -->
						<li #profile class=" topbar-item profile-item" [ngClass]="{'active-topmenuitem': app.activeTopbarItem === profile}">
							<a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <span class="profile-image-wrapper">
                                <img [src]="urlAvatar" alt="avatar" style="border-radius: 50%;"/>
                            </span>
								<span class="profile-info-wrapper">
                                <h3>{{user.first_name}} {{user.first_lastname}}</h3>
                                <span>{{role.name}}</span>
                            </span>
							</a>
							<!-- Perfil secundario -->
							<ul class="profile-item-submenu fadeInDown">
								<li class="profile-submenu-header">
									<div class="performance">
										<span>Weekly Performance</span>
										<img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout"/>
									</div>
									<div class="profile" routerLink="/profile">
										<img [src]="urlAvatar" alt="avatar" style="border-radius: 50%;" width="40"/>
										<h1>{{user.first_name}} {{user.first_lastname}}</h1>
										<span>{{role.name}}</span>
									</div>
								</li>
<!--								<li class="layout-submenu-item">-->
<!--									<i class="pi pi-list icon icon-1"></i>-->
<!--									<div class="menu-text">-->
<!--										<p>Tasks</p>-->
<!--										<span>3 open issues</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
<!--								<li class="layout-submenu-item">-->
<!--									<i class="pi pi-shopping-cart icon icon-2"></i>-->
<!--									<div class="menu-text">-->
<!--										<p>Payments</p>-->
<!--										<span>24 new</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
<!--								<li class="layout-submenu-item">-->
<!--									<i class="pi pi-users icon icon-3"></i>-->
<!--									<div class="menu-text">-->
<!--										<p>Clients</p>-->
<!--										<span>+80%</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
								<li class="layout-submenu-footer">
									<button class="signout-button" (click)="logOut()">
										<i class="pi pi-power-off">&nbsp;Cerrar Sesión</i>
									</button>
									<button class="buy-mirage-button" routerLink="/profile">
										<i class="pi pi-user-edit">&nbsp;Mi Perfil</i>
									</button>
								</li>
							</ul>
						</li>
<!--						<li>-->
<!--							<a href="#" class="layout-rightpanel-button" (click)="app.onRightPanelButtonClick($event)">-->
<!--								<i class="pi pi-arrow-left"></i>-->
<!--							</a>-->
<!--						</li>-->
					</ul>

					<ul class="profile-mobile-wrapper">
						<li #mobileProfile class="topbar-item profile-item"
							[ngClass]="{'active-topmenuitem': app.activeTopbarItem === mobileProfile}">
							<a href="#" (click)="app.onTopbarItemClick($event,mobileProfile)">
                            <span class="profile-image-wrapper">
                                <img [src]="urlAvatar" alt="avatar" style="border-radius: 50%;"/>
                            </span>
								<span class="profile-info-wrapper">
                                <h3>{{user.first_name}} {{user.first_lastname}}</h3>
                                <span>{{role.name}}</span>
                            </span>
							</a>
							<ul class="fadeInDown">
								<li class="profile-submenu-header">
									<div class="performance">
										<span>Weekly Performance</span>
										<img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout"/>
									</div>
									<!-- Perfil Mobile -->
									<div class="profile" routerLink="/profile">
										<img [src]="urlAvatar" alt="avatar" width="45"/>
										<h1>{{user.first_name}} {{user.first_lastname}}</h1>
										<span>{{role.name}}</span>
									</div>
								</li>
<!--								<li>-->
<!--									<i class="pi pi-list icon icon-1"></i>-->
<!--									<div class="menu-text">-->
<!--										<p>Tasks</p>-->
<!--										<span>3 open issues</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
<!--								<li>-->
<!--									<i class="pi pi-shopping-cart icon icon-2"></i>-->
<!--									<div class="menu-text">-->
<!--										<p>Payments</p>-->
<!--										<span>24 new</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
<!--								<li>-->
<!--									<i class="pi pi-users icon icon-3"></i>-->
<!--									<div class="menu-text">-->
<!--										<p>Clients</p>-->
<!--										<span>+80%</span>-->
<!--									</div>-->
<!--									<i class="pi pi-angle-right"></i>-->
<!--								</li>-->
								<li class="layout-submenu-footer">
									<button class="signout-button" (click)="logOut()">
										<i class="pi pi-power-off">&nbsp;Cerrar Sesión</i>
									</button>
									<button class="buy-mirage-button" routerLink="/profile">
										<i class="pi pi-user-edit">&nbsp;Mi Perfil</i>
									</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
    `
})
export class AppTopBarComponent {
    activeItem: number;
    role: Role;
    user: User;
    institution: Institution;
    megaMenus: any[];
    permissions: Permission[];
    langs: string[];
    STORAGE_URL: string;
    urlAvatar: string;
    
    constructor(public app: AppMainComponent,
                private _authService: AuthService,
                private _router: Router,
                private _spinner: NgxSpinnerService) {
        this.role = localStorage.getItem('role') === null ? null : JSON.parse(localStorage.getItem('role')) as Role;
        this.user = localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user')) as User;
        this.institution = localStorage.getItem('institution') === null ? null :
            JSON.parse(localStorage.getItem('institution')) as Institution;
        if (!this.role) {
            this.role = {code: ROLES.ADMIN};
        }
        this.getMegaMenus();
        this.STORAGE_URL = environment.STORAGE_URL;
        this.getUrlAvatar();
    }
    
    mobileMegaMenuItemClick(index) {
        this.app.megaMenuMobileClick = true;
        this.activeItem = this.activeItem === index ? null : index;
    }
    
    logOut() {
        this._spinner.show();
        this._authService.logout().subscribe(response => {
            this._spinner.hide();
            this._authService.removeLogin();
            this._router.navigate(['/auth/login']);
        }, error => {
            this._spinner.hide();
            this._authService.removeLogin();
            this._router.navigate(['/auth/login']);
        });
    }
    
    getMegaMenus() {
        this.permissions = localStorage.getItem('permissions') === null ? null :
            JSON.parse(localStorage.getItem('permissions')) as Permission[];
        this.megaMenus = [];
        if (this.permissions) {
            this.permissions.forEach(permission => {
                const moduleIndex = this.megaMenus.findIndex(menu => menu.module === permission.route.module.id);
                if (permission.route.type.code === TYPE_MENUS.MEGA_MENU) {
                    if (moduleIndex === -1) {
                        this.megaMenus.push(
                            {
                                module: permission.route.module.id,
                                label: permission.route.module.name,
                                icon: permission.route.module.icon,
                                items: [
                                    {
                                        label: permission.route.label,
                                        icon: permission.route.icon,
                                        routerLink: permission.route.uri,
                                        description: permission.route.description
                                    },
                                ]
                            }
                        );
                    } else {
                        this.megaMenus[moduleIndex]['items'].push(
                            {
                                label: permission.route.label,
                                icon: permission.route.icon,
                                routerLink: permission.route.uri,
                                description: permission.route.description
                            },
                        );
                        
                    }
                }
            });
        }
    }
    
    getUrlAvatar() {
        if (this.user) {
            if (this.user.avatar) {
                this.urlAvatar = this.STORAGE_URL + this.user.avatar;
            } else {
                if (this.user.sex) {
                    if (this.user.sex.code === TYPE_SEXS.MALE) {
                        this.urlAvatar = this.STORAGE_URL + 'avatars/male.png';
                    } else {
                        this.urlAvatar = this.STORAGE_URL + 'avatars/famale.png';
                    }
                } else {
                    this.urlAvatar = this.STORAGE_URL + 'avatars/anonymous.png';
                }
            }
        }
    }
}
