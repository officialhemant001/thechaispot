import { useState, useEffect } from 'react';
import { useMenu } from '../../context/MenuContext';
import { useDebounce } from '../../hooks/useDebounce';
import { FiSearch, FiX } from 'react-icons/fi';
import './SearchBar.css';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useMenu();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(localQuery, 300);

  // Sync debounced search to context
  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  // Sync context changes back to local query (e.g. if cleared from elsewhere)
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <div className="search-bar-container container">
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          className="search-input glass"
          placeholder="Search for chai, coffee, burgers, shakes..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          aria-label="Search menu items"
        />
        {localQuery && (
          <button className="search-clear-btn" onClick={handleClear} aria-label="Clear search">
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
}
