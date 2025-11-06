import React, { useEffect, useState } from 'react';
import { fetchMovies, fetchTMDBGenres, fetchTMDBTrailer, fetchYouTubeTrailer } from './api';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import MovieList from './components/MovieList';
import VideoPlayer from './components/VideoPlayer';

export default function App() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [minRating, setMinRating] = useState(0);

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const list = await fetchTMDBGenres();
        if (mounted) setGenres(list);
      } catch (err) {
        
        if (mounted) setGenres([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);


  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchMovies({ query, genre, minRating, page: 1 });
        if (!mounted) return;
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
       
        const message =
          err?.response?.data?.status_message ||
          err?.message ||
          'Failed to fetch movies. Check your network or API key.';
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [query, genre, minRating]);

  
  const currentYear = new Date().getFullYear();

  // Handle watching trailer
  const handleWatchTrailer = async (movie) => {
    setLoadingTrailer(true);
    console.log('Fetching trailer for movie:', movie); // Debug log
    
    try {
      // Try TMDB video endpoint first (doesn't require YouTube API key)
      let trailerData = null;
      
      // Check if movie has a valid numeric ID (from TMDB)
      if (movie.id && typeof movie.id === 'number') {
        console.log('Trying TMDB trailer for movie ID:', movie.id);
        trailerData = await fetchTMDBTrailer(movie.id);
        console.log('TMDB trailer result:', trailerData);
      }
      
      // If TMDB doesn't have trailer, try YouTube search as fallback
      if (!trailerData) {
        console.log('TMDB trailer not found, trying YouTube search...');
        trailerData = await fetchYouTubeTrailer(movie.title, movie.year);
        console.log('YouTube search result:', trailerData);
      }
      
      if (trailerData && trailerData.videoId) {
        setCurrentVideoId(trailerData.videoId);
      } else {
        alert(`Sorry, no trailer found for "${movie.title}". Try searching for a different movie.`);
      }
    } catch (err) {
      console.error('Error fetching trailer:', err);
      alert('Failed to load trailer. Please try again.');
    } finally {
      setLoadingTrailer(false);
    }
  };

  const handleCloseVideo = () => {
    setCurrentVideoId(null);
  };


  return (
    <div className="app">
      <header>
        <h1>Movie App </h1>
        <p>you can find out tollywood or bollywood or hollywood movies and trailers here and enjoy</p>
        
      </header>

      <main>
        <div className="controls">
          <SearchBar onSearch={(q) => setQuery(q)} isLoading={loading} />
          <Filters
            genres={genres}
            selectedGenre={genre}
            onGenreChange={(g) => setGenre(g)}
            minRating={minRating}
            onMinRatingChange={(r) => setMinRating(r)}
          />
        </div>

        <section className="results">
          <MovieList movies={movies} loading={loading} error={error} onWatchTrailer={handleWatchTrailer} />
        </section>
      </main>

      {currentVideoId && (
        <VideoPlayer videoId={currentVideoId} onClose={handleCloseVideo} />
      )}

      {loadingTrailer && (
        <div className="trailer-loading">Loading trailer...</div>
      )}

      <footer>
        <p>
          © {currentYear} <strong>Movie App</strong>. All rights reserved.
        </p>
        <p style={{ fontSize: '12px', color: '#14f21fff' }}>
          Built with  using React and TMDB API
        </p>
        
        
      </footer>
    </div>
  );
}

