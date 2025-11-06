# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- 🎬 Search and browse movies from TMDB (The Movie Database)
- 🎭 Filter by genre and minimum rating
- ▶️ **Watch movie trailers directly from YouTube**
- 📱 Responsive design

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API Keys**
   
   You need the following API keys:
   
   - **TMDB API Key** (Required)
     - Sign up at [https://www.themoviedb.org](https://www.themoviedb.org)
     - Go to Settings → API → Request an API Key
     - **This key is used for both movies AND trailers**
   
   - **YouTube Data API Key** (Optional - only for fallback trailer search)
     - Go to [Google Cloud Console](https://console.cloud.google.com/)
     - Create a new project or select existing
     - Enable "YouTube Data API v3"
     - Create credentials → API Key
     - Copy your API key

4. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your TMDB API key (YouTube key is optional):
   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key_here (optional)
   ```

5. **Start the development server**
   ```bash
   npm start
   ```
   
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How to Use

1. **Search Movies**: Use the search bar to find specific movies
2. **Filter**: Select a genre and minimum rating to refine results
3. **Watch Trailers**: Click the "▶ Watch Trailer" button on any movie card to view the trailer in a modal
4. **Close Trailer**: Click the close button (×) or press ESC to close the video

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
