import React, { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch, isLoading = false }) {
  const [value, setValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const debounceTimeout = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Real-time search with debouncing
  useEffect(() => {
    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new timeout for debounced search
    debounceTimeout.current = setTimeout(() => {
      onSearch(value.trim());
    }, 400); // Wait 400ms after user stops typing for real-time search

    // Cleanup on unmount
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [value, onSearch]);

  function submit(e) {
    e.preventDefault();
    // Clear timeout and search immediately on form submit
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    onSearch(value.trim());
  }

  function handleClear() {
    setValue('');
    onSearch('');
  }

  function handleVoiceSearch() {
    if (!recognitionRef.current) {
      alert('Voice search is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search movies in real-time..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Search movies by title"
          disabled={isLoading}
        />
        {isLoading && value && (
          <span className="search-loading-spinner">⏳</span>
        )}
        {value && !isLoading && (
          <button 
            type="button" 
            onClick={handleClear}
            className="clear-btn"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <button 
        type="button"
        onClick={handleVoiceSearch}
        className={`voice-search-btn ${isListening ? 'listening' : ''}`}
        aria-label="Voice search"
        title="Voice search"
        disabled={isLoading}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      </button>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
