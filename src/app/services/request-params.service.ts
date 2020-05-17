import { Injectable } from '@angular/core';
import { TweetInfo } from '../models/tweets.model';
import { INITIAL_TWEETS_QUANTITY } from '../data/settings.data';
import { AvailableProps, QueryParams } from '../models/api.model';

@Injectable({
	providedIn: 'root'
})
export class RequestParamsService {
	public get(initialRequest: boolean, loadedTweets: TweetInfo[]): QueryParams {
		if (initialRequest || loadedTweets.length === 0) {
			return {
				[AvailableProps.COUNT]: String(INITIAL_TWEETS_QUANTITY)
			};
		}

		return {
			[AvailableProps.AFTER_ID]: String(this.getNewestTweet(loadedTweets).id)
		};
	}

	public getNewestTweet(list: TweetInfo[]): TweetInfo {
		return list.sort((a, b) => b.timeStamp - a.timeStamp)[0];
	}
}
