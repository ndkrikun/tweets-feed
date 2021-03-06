import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { API_ENDPOINT, API_RESET_ENDPOINT } from '../../data/api.data';
import { TweetInfo } from '../../models/tweets.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { UpdateTweetsListAction } from '../../reducers/tweets/actions/update-tweets-list.action';
import { interval, Observable, Subscription } from 'rxjs';
import { UPDATE_FEED_INTERVAL_PERIOD, MAX_TWEET_ID } from '../../data/settings.data';
import { RequestParamsService } from '../../services/request-params.service';
import { ConsoleLoggerService } from '../../services/console-logger.service';
import { ApiResetResponse } from '../../models/api.model';

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

	/**
	 * Interval for feed updating
	 */
	private updateTweetsInterval: Observable<number>;

	/**
	 * Storage for all rxjs subscriprions
	 */
	private subscriptions = new Array<Subscription>();

	constructor(
		private readonly store: Store<AppState>,
		private readonly http: HttpClient,
		private readonly requestParams: RequestParamsService,
		private readonly consoleLogger: ConsoleLoggerService,
	) {}

	/**
	 * Component life cycle hook
	 */
	public ngOnInit(): void {
		this.updateTweets();
		this.setUpdateTweetsInterval();
	}

	/**
	 * Component life cycle hook
	 */
	public ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	/**
	 * Updates state with newest tweets
	 */
	private updateTweets(): void {
		this.tweets$.pipe(take(1)).subscribe(currentList => {
			const requestParams = this.requestParams.get(currentList);

			this.http.get<TweetInfo[]>(API_ENDPOINT, { params: requestParams}).pipe(take(1)).subscribe(
				payload => this.store.dispatch(new UpdateTweetsListAction(payload)),
				(error: HttpErrorResponse) => this.consoleLogger.logRequestError(error)
			);

			// Automatically resets tweets DB when its full
			if (this.isFullDataBase(currentList)) {
				this.resetTweetsDataBase();
			}
		});
	}

	/**
	 * Sets interval for updating tweets
	 */
	private setUpdateTweetsInterval(): void {
		this.updateTweetsInterval = interval(UPDATE_FEED_INTERVAL_PERIOD);
		this.subscriptions.push(
			this.updateTweetsInterval.subscribe(() => this.updateTweets())
		);
	}

	/**
	 * Tells if tweets data base is full
	 */
	private isFullDataBase(list: TweetInfo[]): boolean {
		return list.some(({ id }) => id >= MAX_TWEET_ID);
	}

	/**
	 * Sends request that resets tweets data base
	 */
	private resetTweetsDataBase(): void {
		this.http.get<ApiResetResponse>(API_RESET_ENDPOINT).pipe(take(1)).subscribe(
			payload => this.consoleLogger.logResetRequestResponse(payload),
			(error: HttpErrorResponse) => this.consoleLogger.logRequestError(error)
		);
	}

}
