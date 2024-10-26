import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UtilsService {
	private _headerSub = new BehaviorSubject<string>('');
	public header$ = this._headerSub.asObservable();

	private _loaderSub = new BehaviorSubject<boolean>(false);
	loader$ = this._loaderSub.asObservable();

	public setHeader(header: string): void {
		this._headerSub.next(header);
	}

	public showLoader(): void {
		this._loaderSub.next(true);
	}

	public hideLoader(): void {
		this._loaderSub.next(false);
	}
}
