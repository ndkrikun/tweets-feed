import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { endpoint } from 'src/app/data/api';
import { TweetInfo } from 'src/app/models/tweets.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UpdateTweetsListAction } from 'src/app/reducers/tweets/actions/update-tweets-list.action';

@Component({
	selector: 'app-tweets-container',
	templateUrl: './tweets-container.component.html',
	styleUrls: ['./tweets-container.component.sass']
})
export class TweetsContainerComponent implements OnInit {
	/**
	 * Collection all tweets
	 */
	public readonly tweets$ = this.store.select(({ tweets: {list} }) => list);

	constructor(
		private readonly store: Store<AppState>,
		private readonly http: HttpClient
	) { }

	ngOnInit() {
		this.http.get<TweetInfo[]>(endpoint, {params: {count: '10'}}).pipe(
			take(1)
		).subscribe(payload => this.store.dispatch(new UpdateTweetsListAction(payload)));
	}

}
