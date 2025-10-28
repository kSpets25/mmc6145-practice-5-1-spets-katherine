// /pages/about.js
import NavBar from '../components/NavBar';

export default function About() {
  return (
    <div className="container">
      <NavBar />
      <h1 className="title">🎵 About MyBand</h1>
      <p className="about-text">
        MyBand helps you discover <strong>similar music</strong> to your favorite artists or songs using
        the <a href="https://tastedive.com" target="_blank" rel="noreferrer">TasteDive API</a>.
      </p>
      <p className="about-text">
        Simply enter a band, artist, or song in the search bar and find related music instantly!
      </p>
    </div>
  );
}
