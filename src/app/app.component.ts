import {Component} from '@angular/core';
import * as moment from 'moment';
moment.locale('es');
@Component({
    selector: 'app-root',
    template: `
		<ngx-spinner
				bdColor="rgba(0, 0, 0, 0.8)"
				size="large"
				color="#eb8b1c"
				fullScreen="false"
				template="<img src='assets/layout/images/spinner.png'/>"
		>
			<p style="color: white"> Loading...</p>
		</ngx-spinner>

		<router-outlet></router-outlet>
    `,
})
export class AppComponent {

}
