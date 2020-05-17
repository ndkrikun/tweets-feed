import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { TweetInfo } from '../../models/tweets.model';

@Component({
	selector: 'app-tweet-element',
	templateUrl: './tweet-element.component.html',
	styleUrls: ['./tweet-element.component.sass']
})
export class TweetElementComponent {
	/**
	 * Single tweet info
	 */
	@Input() tweetInfo: TweetInfo;

	constructor(
		private readonly sanitization: DomSanitizer
	) {}

	/**
	 * Wraps url with style template and tests it with sanitization service
	 */
	public get backgroundImage(): SafeStyle {
		return this.sanitization.bypassSecurityTrustStyle(`url('${this.tweetInfo.image}')`);
	}
}
