import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchEngine() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search DuckDuckGo..."
          className="terminal-input flex-1"
        />
        <button type="submit" className="crt-button">
          <Search className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}