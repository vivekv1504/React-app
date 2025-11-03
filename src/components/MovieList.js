import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies = [], loading, error }) {
  if (loading) {
    return <div className="status">Loading movies…</div>;
  }
  if (error) {
    return <div className="status error">Error: {error}</div>;
  }
  if (!movies || movies.length === 0) {
    return <div className="status">No movies found.</div>;
  }
  return (
    <div className="movie-list">
      {movies.map((m) => (
        <MovieCard movie={m} key={m.id} />
      ))}
    </div>
  );
}
