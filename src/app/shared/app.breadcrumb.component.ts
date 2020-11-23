import {Component, OnDestroy} from '@angular/core';
import {BreadcrumbService} from './breadcrumb.service';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {User} from '../models/auth/user';

@Component({
    selector: 'app-breadcrumb',
    template: `
		<div class="layout-breadcrumb">
			<div class="breadcrumb">
				<div class="route-bar-breadcrumb">
					<ng-template ngFor let-item let-last="last" [ngForOf]="items">
						<li>
							<a [routerLink]="item.routerLink" *ngIf="item.routerLink">{{item.label}}</a>
							<ng-container *ngIf="!item.routerLink">{{item.label}}</ng-container>
						</li>
						<li *ngIf="!last"><i class="pi pi-angle-right"></i></li>
					</ng-template>
				</div>
			</div>
<!--			<div class="notification">👋 Hello, {{user.first_name}} {{user.first_lastname}}</div>-->
		</div>
    `
})

export class AppBreadcrumbComponent implements OnDestroy {
    subscription: Subscription;
    items: MenuItem[];
    user: User;
    
    constructor(public breadcrumbService: BreadcrumbService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
        this.user = JSON.parse(localStorage.getItem('user')) as User;
    }
    
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
