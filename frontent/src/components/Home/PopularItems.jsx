import { useMenu } from '../../context/MenuContext';
import MenuCard from '../Menu/MenuCard';
import Loader from '../UI/Loader';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './PopularItems.css';

export default function PopularItems({ onItemClick }) {
  const { getPopularItems, loading, error } = useMenu();

  if (loading) {
    return (
      <section className="popular-section section" id="popular-section">
        <div className="container">
          <div className="section-title">
            <h2>Popular Right Now</h2>
            <p>Our customers' absolute favorites, brewed and baked fresh daily</p>
          </div>
          <div className="popular-grid">
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ height: '350px' }} className="skeleton"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return null;

  const popularItems = getPopularItems().slice(0, 4); // Display top 4 popular items

  if (popularItems.length === 0) return null;

  return (
    <section className="popular-section section" id="popular-section">
      <div className="container">
        <div className="section-title animate-fadeInUp">
          <h2>Popular Right Now</h2>
          <p>Our customers' absolute favorites, brewed and baked fresh daily</p>
        </div>

        <div className="popular-grid">
          {popularItems.map((item) => (
            <MenuCard key={item.id} item={item} onClick={onItemClick} />
          ))}
        </div>

        <div className="popular-action animate-fadeIn">
          <Link to="/menu" className="view-menu-btn">
            View Full Menu <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
