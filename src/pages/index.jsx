// /pages/index.js

import MusicSearch from '../components/MusicSearch';
import NavBar from '../components/NavBar';

export default function Home({ results, userquery, error }) {
  return (
    <div className="container">
      <NavBar />

      <h1 className="title">🎧 MyBand — Search Similar Music</h1>

      <MusicSearch />

      {userquery && <h2 className="subtitle">Similar music to: "{userquery}"</h2>}

      {error && <p className="error">{error}</p>}

      {results?.length > 0 ? (
        <ul className="results-list">
          {results.map((item, idx) => (
            <li key={idx} className="result-item">
              <h3>{item.Name}</h3>
              {item.wTeaser && <p className="teaser">{item.wTeaser}</p>}
              <div className="links">
                {item.wUrl && (
                  <a href={item.wUrl} target="_blank" rel="noreferrer">
                    🔗 Wikipedia
                  </a>
                )}
                {item.yUrl && (
                  <a href={item.yUrl} target="_blank" rel="noreferrer">
                    ▶️ YouTube
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        userquery && !error && <p className="no-results">No similar music found.</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  
  const { userquery } = context.query;
  ////notes from teacher
  //const searchTerm = context.query.userquery
  //if (searchTerm) {
  // const response = await fetch(/* url + API key + searchTerm*)
  // const data = awayit res.json()
  //return {props: {data}}
  //}
  //return {props: {}} (we hae to return this object even without performing the above call.)

  if (!userquery) {
    return { props: { results: [], userquery: null } };
  }

  const apiKey = process.env.TASTEDIVE_API_KEY || '';
  const apiUrl = `https://tastedive.com/api/similar?q=${encodeURIComponent(
    userquery
  )}&type=music&info=1&limit=10&k=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    return {
      props: {
        results: data?.Similar?.Results || [],
        userquery,
      },
    };
  } catch (err) {
    return {
      props: {
        results: [],
        userquery,
        error: 'Failed to fetch similar music from TasteDive API.',
      },
    };
  }
}


