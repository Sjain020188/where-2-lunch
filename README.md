# Where 2 lunch

## Introduction

This project is created as a part of Coding Challenge for Cogent labs.
The webapp helps the staff of Cogent Labs with recommendation for lunch within 1km of office. It displays a random restaurant as recommendation and also allow you to search from all restaurants based on name and category.

## Technical Decisions

- API used to get the data of restaurants within 1km from Cogent labs office is FourSquare.
- API used to display the map of restaurant is Mapbox.
- Redux is used for state management within the webapp. Redux state is persisted in local storage. The app pulls the data from API only if redux state in local storage doesn't contain restaurants info. This is done just to reduce number of API calls (as the API is not free). In real application we might want to pull data from API atleast once per day to make sure we have the latest restaurant details.
- Material UI is used for components for quick development.
- Formula to get the random restaurant is based on date so that we display only restaurant recommendation per day. If we use something like Math.random it might display different restaurant each time user refreshes the screen.
- Tests are written in react-testing-library and my focus while testing is from end user perspective. So the tests are mix of unit test and intergration test.

## Stack used

- React
- Redux (for state management)
- React-Router (For routing)
- Material-UI (for components)
- Styled-Components (for styling)
- axios (for fetching API data)
- react-map-gl (for displaying map)
- React-testing-library (for writing tests)

## Setup and run the project locally

- Create a `.env` file in root directory. Add following keys

```
  REACT_APP_FOURSQUARE_API_KEY
  REACT_APP_MAPBOX_ACCESS_TOKEN
```

You need API keys for Foursquare places API and Mapbox.

- Install all dependencies

`yarn`

- Start the server

`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn lint:fix`

This command will fix the linitng errors.

### `yarn format`

This command will format your files using prettier configuration.

### `test:coverage`

To check the test coverage.

## What would I do if I have more time.

- Add more data points to display more details about restaurants like menu, opening closing time etc
- Style the app
- Add more test coverage. Did not get much time to write more tests. So I have added test few components only.
- Instead of storing entire dump of details from API store only relevant data in proper format.

`restaurants = {fsq_id: {name, location, geocodes: {lat, lng}, categories, photos, tips}}`

- Some of the details on Details page are hardcoded because free version of Places API doesn't provide those info.

## Issues is current codebase

- in useRestaurants hook, I am getting photos of all the restaurants at once. This might take some time for the recommendation page to load. Better solution would be to get the images of restaurants when needed.
- The marker in the location map is not correct.
- getRandomRestaurant is not mocked in Recommendation test.
- There is a Typeerror in test related to mapbox

## Notes

- Some comments are added in code explaining my thought process. You can search them using NOTE:

## Profile

LinkedIn
https://www.linkedin.com/in/shruti-jain-japan/

Github
https://github.com/Sjain020188

## Other Project

https://github.com/crazy-bananas/boogie-woogie
