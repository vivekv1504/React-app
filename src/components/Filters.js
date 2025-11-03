import React from 'react';

export default function Filters({ genres = [], selectedGenre, onGenreChange, minRating, onMinRatingChange }) {
  return (
    <div className="filters">
      <label>
        Genre:
        <select value={selectedGenre} onChange={(e) => onGenreChange(e.target.value)}>
          <option value="">All</option>
          {genres.map((g) => (
            <option key={g.id || g} value={g.id || g}>
              {g.name || g}
            </option>
          ))}
        </select>
      </label>

      <label>
        Min Rating:
        <select value={minRating} onChange={(e) => onMinRatingChange(Number(e.target.value))}>
          <option value={0}>Any</option>
          <option value={2}>2+</option>
          <option value={4}>4+</option>
          <option value={6}>6+</option>
          <option value={7}>7+</option>
          <option value={8}>8+</option>
        </select>
      </label>
    </div>
  );
}
