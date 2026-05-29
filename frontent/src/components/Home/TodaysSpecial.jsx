import { useMenu } from '../../context/MenuContext';
import { getPlaceholderImage } from '../../utils/constants';
import { FiStar, FiChevronRight } from 'react-icons/fi';
import './TodaysSpecial.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function TodaysSpecial({ onItemClick }) {
  const { getTodaysSpecials, loading, error } = useMenu();

  if (loading || error) return null;

  const specials = getTodaysSpecials();
  if (specials.length === 0) return null;

  // Pick the primary featured item of the day
  const featuredItem = specials[0];

  // Resolve image URL
  let imageUrl = featuredItem.image_url;
  if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    imageUrl = `${API_BASE_URL}${imageUrl}`;
  }
  const fallbackImage = getPlaceholderImage(featuredItem.category_slug || '', featuredItem.slug || '');
  const displayImage = imageUrl || fallbackImage;

  return (
    <section className="special-section section">
      <div className="container">
        <div className="section-title">
          <h2>Chef's Special for Today</h2>
          <p>Hand-picked daily delights prepared with extra care and love</p>
        </div>

        <div 
          className="special-card glass" 
          onClick={() => onItemClick && onItemClick(featuredItem)}
        >
          {/* Left / Top Side: Large Image */}
          <div className="special-image-wrapper">
            <img 
              src={displayImage} 
              alt={featuredItem.name} 
              className="special-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />
            <div className="special-badge">
              <FiStar className="badge-icon" /> Today's Special
            </div>
          </div>

          {/* Right / Bottom Side: Content details */}
          <div className="special-details">
            <span className="special-category">{featuredItem.category_name}</span>
            <div className="special-header">
              <h3 className="special-name">{featuredItem.name}</h3>
              <span className={`special-type-dot ${featuredItem.food_type}`}></span>
            </div>
            
            <p className="special-description">{featuredItem.description}</p>

            <div className="special-pricing">
              <div className="price-box">
                <span className="price-label">Price</span>
                <span className="price-value">₹{parseFloat(featuredItem.price).toFixed(0)}</span>
              </div>
              {featuredItem.has_discount && (
                <div className="discount-box">
                  <span className="discount-label">Save {featuredItem.discount_percentage}%</span>
                  <span className="original-value">₹{parseFloat(featuredItem.original_price).toFixed(0)}</span>
                </div>
              )}
            </div>

            <button 
              className="special-cta-btn"
              onClick={(e) => {
                e.stopPropagation();
                onItemClick && onItemClick(featuredItem);
              }}
            >
              View Details <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
