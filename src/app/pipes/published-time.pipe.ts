import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'publishedTime'
})
export class PublishedTimePipe implements PipeTransform {
	/**
	 * Converts timeStamp to readable published time format
	 */
	transform(timeStamp: number): string {
		const date = new Date(timeStamp * 1000);

		const hours = date.getHours();
		const minutes = '0' + date.getMinutes();
		const seconds = '0' + date.getSeconds();

		return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
	}

}
