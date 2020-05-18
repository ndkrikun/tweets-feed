import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResetResponse } from '../models/api.model';

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
	 * Logs error message for http request error
	 */
	public logResetRequestResponse({success}: ApiResetResponse): void {
		this.logInfo(success ? 'API was successfully reset' : 'There was a mistake during resetting API');
	}

	/**
	 * Logs error
	 */
	private logError(error: string): void {
		console.warn(error);
	}

	/**
	 * Logs info
	 */
	private logInfo(error: string): void {
		// tslint:disable-next-line:no-console
		console.info(error);
	}
}
