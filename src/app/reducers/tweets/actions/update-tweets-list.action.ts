import { Action } from '@ngrx/store';
import { TweetsActionTypes } from '../tweets.action-types';
import { TweetsState } from '../tweets.state';
import { TweetInfo } from '../../../models/tweets.model';


export class UpdateTweetsListAction implements Action {

	public readonly type = TweetsActionTypes.UPDATE_TWEETS_LIST;

	constructor(
		public payload: TweetInfo[],
	) { }

	public reduce(this: void, state: TweetsState, action: UpdateTweetsListAction): TweetsState {
		return {
			...state,
			list: action.payload.concat(state.list),
		};
	}
}
