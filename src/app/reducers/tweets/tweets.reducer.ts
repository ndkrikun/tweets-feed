import { TweetsActionTypes } from "./tweets.action-types";
import { TweetsState } from "./tweets.state";
import { UpdateTweetsListAction } from "./actions/update-tweets-list.action";
import { UpdateOldTweetsAction } from "./actions/update-old-tweets.action";

const tweetsDefaultState: TweetsState = {
  list: []
};

type TweetsActions = UpdateTweetsListAction | UpdateOldTweetsAction;

export function tweetsReducer(
  this: void,
  state = tweetsDefaultState,
  action: TweetsActions
): TweetsState {
  switch (action.type) {
    case TweetsActionTypes.UPDATE_TWEETS_LIST:
      return action.reduce(state, action);
    case TweetsActionTypes.UPDATE_OLD_TWEETS:
      return action.reduce(state, action);
    default:
      return state;
  }
}
