import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useMenu } from '../../context/MenuContext';
import './HeroBanner.css';

export default function HeroBanner() {
  const { restaurant } = useMenu();

  return (
    <section className="hero-banner">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="hero-text-card animate-fadeInUp">
          <span className="hero-welcome">Welcome To</span>
          <h1 className="hero-title">{restaurant?.name || 'The Chai Spot'}</h1>
          <p className="hero-tagline">{restaurant?.tagline || 'Where every sip tells a story'}</p>
          <p className="hero-description">
            {restaurant?.description || 'Your cozy neighborhood cafe serving handcrafted chai, premium coffee, fresh bakes, and delicious snacks. Every cup is brewed with love and the finest ingredients.'}
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="hero-cta-btn">
              Explore Our Menu <FiArrowRight className="cta-icon" />
            </Link>
            <a href="#popular-section" className="hero-secondary-btn">
              Popular Items
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
