// components/MusicSearch.js
// components/MusicSearch.js
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function MusicSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Route to the same page with query param
    router.replace(`/?userquery=${encodeURIComponent(query)}`);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Enter an artist or song to find similar music..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" type="submit">
        Search Similar Music
      </button>
    </form>
  );
}
