import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-container container animate-fadeIn">
      <div className="not-found-content">
        <span className="not-found-emoji">🫖</span>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! This cup is empty.</h2>
        <p className="not-found-text">
          The page you are looking for doesn't exist, has been removed, or has been spilled. Let's get you back to the warm comfort of our cafe homepage!
        </p>
        <Link to="/" className="not-found-btn">
          <FiHome /> Go to Homepage
        </Link>
      </div>
    </div>
  );
}
