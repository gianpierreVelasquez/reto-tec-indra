import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { UtilsService } from '@core/services/utils.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	constructor(private readonly utilsService: UtilsService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		this.utilsService.showLoader();

		return next
			.handle(req)
			.pipe(finalize(() => this.utilsService.hideLoader()));
	}
}
