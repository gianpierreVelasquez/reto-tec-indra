import { Component } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	header$ = this.utilsService.header$;

	constructor(private readonly utilsService: UtilsService) {}
}
