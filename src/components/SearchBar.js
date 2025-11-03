import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  function submit(e) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <input
        type="text"
        placeholder="Search by title..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search movies by title"
      />
      <button type="submit">Search</button>
    </form>
  );
}
