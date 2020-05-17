import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ConsoleLoggerService {
	/**
	 * Logs error message for http request error
	 */
	public logRequestError(error: HttpErrorResponse): void {
		this.logError(`Request error (${ error.url }): ${ error.status } ${ error.statusText }`);
	}

	/**
	 * Logs error
	 */
	private logError(error: string): void {
		console.warn(error);
	}
}
