import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ConsoleLoggerService {
	public logRequestError(error: HttpErrorResponse): void {
		this.logError(`Request error (${ error.url }): ${ error.status } ${ error.statusText }`);
	}

	private logError(error: string): void {
		console.warn(error);
	}
}
