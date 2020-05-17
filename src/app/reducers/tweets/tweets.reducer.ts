import { TweetsActionTypes } from './tweets.action-types';
import { TweetsState } from './tweets.state';
import { UpdateTweetsListAction } from './actions/update-tweets-list.action';

const tweetsDefaultState: TweetsState = {
	list: []
};

type TweetsActions = (
	| UpdateTweetsListAction
);

export function tweetsReducer(
	this: void,
	state = tweetsDefaultState,
	action: TweetsActions,
): TweetsState {
	switch (action.type) {
		case TweetsActionTypes.UPDATE_TWEETS_LIST: return action.reduce(state, action);
		default: return state;
	}
}
