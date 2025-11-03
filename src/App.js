import React, { useEffect, useState } from 'react';
import { fetchMovies, fetchTMDBGenres } from './api';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import MovieList from './components/MovieList';

export default function App() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [minRating, setMinRating] = useState(0);

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
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


  return (
    <div className="app">
      <header>
        <h1>Movie App </h1>
        <p>you can serch tollywood or bollywood or hollywood movies find out here</p>
        
      </header>

      <main>
        <div className="controls">
          <SearchBar onSearch={(q) => setQuery(q)} />
          <Filters
            genres={genres}
            selectedGenre={genre}
            onGenreChange={(g) => setGenre(g)}
            minRating={minRating}
            onMinRatingChange={(r) => setMinRating(r)}
          />
        </div>

        <section className="results">
          <MovieList movies={movies} loading={loading} error={error} />
        </section>
      </main>

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

