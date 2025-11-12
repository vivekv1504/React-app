# Project Summary: Movie App

## 1. Project Overview
A modern React-based movie browser app with advanced UI/UX, real-time and voice search, and integrated YouTube trailer playback. Features include TMDB and YouTube API integration, a modal video player, advanced CSS (glassmorphism, gradients, custom scrollbars), and a professional microphone button for voice search.

## 2. Folder Structure
```
package.json
README.md
build/
  asset-manifest.json
  index.html
  manifest.json
  robots.txt
  static/
    css/
      main.db3fe703.css
    js/
      main.86e7d766.js
      main.86e7d766.js.LICENSE.txt
public/
  index.html
  manifest.json
  robots.txt
src/
  api.js
  App.css
  App.js
  App.test.js
  index.css
  index.js
  reportWebVitals.js
  setupTests.js
  components/
    Filters.js
    MovieCard.js
    MovieList.js
    SearchBar.js
```

## 3. Key Features
- **Movie Search:** Real-time search with debouncing and voice input (SpeechRecognition API).
- **Trailer Playback:** Fetches trailers from TMDB and YouTube, plays in a modal (VideoPlayer component).
- **Advanced UI:** Glassmorphism, gradients, custom scrollbars, animated SVG microphone button.
- **Responsive Design:** Works well on desktop and mobile.

## 4. Main Components
- `src/api.js`: Handles TMDB and YouTube API calls, trailer fallback logic.
- `src/components/VideoPlayer.js`: Modal for YouTube trailer playback.
- `src/components/MovieCard.js`: Displays movie info and "Watch Trailer" button.
- `src/components/MovieList.js`: Renders grid of MovieCards.
- `src/components/SearchBar.js`: Real-time and voice search, clear button, animated SVG microphone.
- `src/App.js`: Main state management, integrates all features.
- `src/App.css`: Advanced CSS for modern, cinematic look.

## 5. APIs Used
- **TMDB API:** For movie data and trailers.
- **YouTube Data API:** For trailer fallback.
- **Web Speech API:** For voice search.

## 6. UI/UX Highlights
- Glassmorphism cards and modals
- Animated, glowing SVG microphone button
- Custom scrollbars and hover effects
- Cinematic background image

## 7. How to Run
1. Install dependencies: `npm install`
2. Add your TMDB and YouTube API keys to `.env`
3. Start the app: `npm start`

## 8. Author
- [Your Name]

---
This summary was auto-generated for quick onboarding and project understanding.
