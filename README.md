# Tweets Feed

This is the tweets feed widget. This project is [hosted on codesandbox.io](https://codesandbox.io/s/github/ndkrikun/tweets-feed/tree/master) as a docker container.
**NOTE:** Please, allow sevelar minutes for container to set up when you load this project for the first time.
If codesandbox browser displays 502 error, please wait until the app is built and them refresh the browser.

## Goal

Build an auto-updating twitter-like feed.

## Feature Requirements

I want to run an auto-updating twitter like feed. Here is a rough mockup of the expected UI. [Link to the image.](https://www.dropbox.com/s/v597kaxjhr9rhh4/twitter-interview-feed.png?dl=0)

- The app should show the latest tweets after the first request
- The list of tweets should update automatically every two seconds
- The older tweets must be pushed down in the page
- The newer tweets should come at the top
- There should be no duplicate tweets on the page
- There should be no skipped or missed tweets on the page
- In case of any failure conditions the tweet updates can pause or stop, but no error messages should be shown to the user.

## API Specification

We have a virtual twitter server hosted on - `magiclab-twitter-interview.herokuapp.com/nikita-kirikun`

### API Info

There are several API endpoints at your disposal. You have to pick the most suitable one for your architecture decisions.

- The API returns a JSON response and supports CORS
- The JSON response contains the username, id, time stamp, image and text
- The tweets will max out after 10,000 entries. After which you need to reset the database.
- The API is designed to fail randomly with HTTP 500 and you must handle this in your code. If it fails just try to fetch the updates again.
- The server responses are always sorted with latest id on top
- The API parameter count is optional (defaults to 20) and can be between 1 and 50

### API Endpoints

`/api?count=X`
Returns the latest X tweets

`/api?count=X&afterId=ID`
Returns X tweets created after the id ID

`/api?count=X&beforeId=ID`
Returns X tweets created before the id ID

`/api?count=X&id=ID&direction=(-1 OR 1)`
Returns X tweets with the ID and the direction in time (-1 for past, 1 for future)

`/api?count=X&afterTime=TS`
Returns X tweets created after the timestamp TS

`/api?count=X&beforeTime=TS`
Returns X tweets created before the timestamp TS

`/api?count=X&time=TS&direction=(-1 OR 1)`
Returns X tweets with timestamp TS  and the direction in time (-1 for past, 1 for future)

`/reset`
This resets the database back to 100 entries. You can use it for your testing purposes.

## Technical Requirements

- Host your code on codesandbox.io as this will allow us to easily review and run your solution
- You don’t need to focus on the UI too much, a barebones version will do just fine
- You can choose any technology stack you are comfortable with
- Please don’t make any additional efforts on writing tests etc
- We will be reviewing your code on the following criteria:
    - Architecture decisions made
    - Readability of your code
    - Handling of edge cases, performance issues and stability of the webapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
