import { Injectable } from "@angular/core";
import { TweetInfo } from "../models/tweets.model";
import { DEFAULT_TWEETS_QUANTITY } from "../data/settings.data";
import { AvailableProps, QueryParams } from "../models/api.model";

@Injectable({
  providedIn: "root"
})
export class RequestParamsService {
  public getOldTweets(loadedTweets: TweetInfo[]): QueryParams {
    const tweets = this.sortTwetsByTimestamp(loadedTweets);

    const { id } = tweets[tweets.length - 1];

    return {
      [AvailableProps.COUNT]: String(DEFAULT_TWEETS_QUANTITY),
      [AvailableProps.BEFORE_ID]: String(id)
    };
  }

  /**
   * Returns required params for request
   */
  public getNewTweets(loadedTweets: TweetInfo[]): QueryParams {
    const isFirstRequest = loadedTweets.length === 0;

    if (isFirstRequest) {
      return {
        [AvailableProps.COUNT]: String(DEFAULT_TWEETS_QUANTITY)
      };
    }

    const { id } = this.sortTwetsByTimestamp(loadedTweets)[0];

    return {
      [AvailableProps.AFTER_ID]: String(id)
    };
  }

  /**
   * Returns newest tweet
   */
  public sortTwetsByTimestamp(list: TweetInfo[]): TweetInfo[] {
    return list.sort((a, b) => b.timeStamp - a.timeStamp);
  }
}
