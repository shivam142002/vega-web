// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");


  // Triggers search when a valid query is entered
  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    } else {
      alert("Please enter a search term");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
