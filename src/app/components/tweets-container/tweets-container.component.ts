import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { endpoint } from 'src/app/data/api.data';
import { TweetInfo } from 'src/app/models/tweets.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UpdateTweetsListAction } from 'src/app/reducers/tweets/actions/update-tweets-list.action';
import { interval, Observable, Subscription } from 'rxjs';
import { INITIAL_TWEETS_QUANTITY, UPDATE_FEED_INTERVAL_PERIOD } from 'src/app/data/settings.data';
import { QueryParams, AvailableProps } from 'src/app/models/api.model';

@Component({
	selector: 'app-tweets-container',
	templateUrl: './tweets-container.component.html',
	styleUrls: ['./tweets-container.component.sass']
})
export class TweetsContainerComponent implements OnInit, OnDestroy {
	/**
	 * Collection of all tweets
	 */
	public readonly tweets$ = this.store.select(({ tweets: {list} }) => list);

	private interval: Observable<number>;

	private subscriptions = new Array<Subscription>();

	constructor(
		private readonly store: Store<AppState>,
		private readonly http: HttpClient
	) { }

	public ngOnInit(): void {
		this.fetchTweets(true);
		this.setUpdateTweetsTimer();
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	private fetchTweets(isInitialRequest: boolean): void {
		this.tweets$.pipe(take(1)).subscribe((list) => {
			this.http.get<TweetInfo[]>(endpoint, { params: this.getRequestParams(isInitialRequest, list)}).pipe(
				take(1)
			).subscribe(payload => this.store.dispatch(new UpdateTweetsListAction(payload)));
		});
	}

	private getRequestParams(initialRequest: boolean, loadedTweets: TweetInfo[]): QueryParams {
		if (initialRequest || loadedTweets.length === 0) {
			return {
				[AvailableProps.COUNT]: String(INITIAL_TWEETS_QUANTITY)
			};
		}

		const newestTweet = loadedTweets.sort((a, b) => b.timeStamp - a.timeStamp)[0];

		return {
			[AvailableProps.AFTER_ID]: String(newestTweet.id)
		};
	}

	private setUpdateTweetsTimer(): void {
		this.interval = interval(UPDATE_FEED_INTERVAL_PERIOD);
		this.subscriptions.push(
			this.interval.subscribe(() => this.fetchTweets(false))
		);
	}

}
