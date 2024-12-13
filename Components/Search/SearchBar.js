import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleSearch = () => {
    if (query && typeof onSearch === "function") {
      onSearch(query); // Perform search
      const updatedSearches = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 5);
      setRecentSearches(updatedSearches); // Update local state
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches)); // Update localStorage
      setQuery(""); // Clear input
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch}>Search</button>
      {recentSearches.length > 0 && (
        <div>
          <h4>Recent Searches</h4>
          <ul>
            {recentSearches.map((search, index) => (
              <li
                key={index}
                onClick={() => onSearch(search)}
                style={{ cursor: "pointer" }}
              >
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
