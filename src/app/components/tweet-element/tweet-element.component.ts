import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { TweetInfo } from 'src/app/models/tweets.model';

@Component({
	selector: 'app-tweet-element',
	templateUrl: './tweet-element.component.html',
	styleUrls: ['./tweet-element.component.sass']
})
export class TweetElementComponent {
	@Input() tweetInfo: TweetInfo;

	constructor(
		private readonly sanitization: DomSanitizer
	) {}

	public get backgroundImage(): SafeStyle {
		return this.sanitization.bypassSecurityTrustStyle(`url('${this.tweetInfo.image}')`);
	}

	public get publishedTime(): string {
		const date = new Date(this.tweetInfo.timeStamp * 1000);

		const hours = date.getHours();
		const minutes = '0' + date.getMinutes();
		const seconds = '0' + date.getSeconds();

		return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	}
}
