import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppState } from './app.state';
import { AppComponent } from './app.component';
import { TweetsContainerComponent } from './components/tweets-container/tweets-container.component';
import { TweetElementComponent } from './components/tweet-element/tweet-element.component';
import { tweetsReducer } from './reducers/tweets/tweets.reducer';

@NgModule({
	declarations: [
		AppComponent,
		TweetsContainerComponent,
		TweetElementComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		StoreModule.forRoot<AppState>({
			tweets: tweetsReducer,
		}),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
