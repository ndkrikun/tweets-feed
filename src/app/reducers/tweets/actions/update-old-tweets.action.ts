import { Action } from "@ngrx/store";
import { TweetsActionTypes } from "../tweets.action-types";
import { TweetsState } from "../tweets.state";
import { TweetInfo } from "../../../models/tweets.model";

/**
 * Updates tweets list state with new elements
 */
export class UpdateOldTweetsAction implements Action {
  public readonly type = TweetsActionTypes.UPDATE_OLD_TWEETS;

  constructor(public payload: TweetInfo[]) {}

  public reduce(
    this: void,
    state: TweetsState,
    action: UpdateOldTweetsAction
  ): TweetsState {
    return {
      ...state,
      list: state.list.concat(action.payload)
    };
  }
}
