import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ConsoleLoggerService {
	public getRequestErrorMessage(error: HttpErrorResponse): string {
		return `Request error (${ error.url }): ${ error.status } ${ error.statusText }`;
	}

	public logError(error: string): void {
		console.warn(error);
	}
}
