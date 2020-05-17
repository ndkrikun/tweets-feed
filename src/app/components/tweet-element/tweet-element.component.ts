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
}
