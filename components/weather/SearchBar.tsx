"use client";

import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onGeolocation: () => void;
  loading?: boolean;
  geolocating?: boolean;
}

export function SearchBar({ onSearch, onGeolocation, loading = false, geolocating = false }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-white/80 dark:bg-black/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full p-2 shadow-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, zip code or landmark"
            className="flex-1 bg-transparent border-none outline-none px-4 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500"
            disabled={loading || geolocating}
          />
          <button
            type="button"
            onClick={onGeolocation}
            disabled={loading || geolocating}
            className="p-2 text-zinc-500 hover:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50 transition-colors"
            title="Use current location"
            aria-label="Use current location"
          >
            {geolocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
          </button>
          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
          <button
            type="submit"
            disabled={!query.trim() || loading || geolocating}
            className="p-2 rounded-full bg-black dark:bg-white text-white dark:text-black disabled:opacity-50 hover:scale-105 transition-transform"
            aria-label="Search weather"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </form>
  );
}
