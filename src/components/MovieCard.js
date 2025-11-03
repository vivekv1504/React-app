import React from 'react';

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="poster">
        {movie.poster ? (
          <img src={movie.poster} alt={`${movie.title} poster`} />
        ) : (
          <div className="no-poster">No Image</div>
        )}
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="meta">
          <span>⭐ {movie.rating ?? 'N/A'}</span>
          {movie.year ? <span> • {movie.year}</span> : null}
        </div>
        <p className="overview">{movie.overview || 'No description available.'}</p>
      </div>
    </div>
  );
}
