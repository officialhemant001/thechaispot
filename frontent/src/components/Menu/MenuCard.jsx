import { getPlaceholderImage } from '../../utils/constants';
import Badge from '../UI/Badge';
import './MenuCard.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function MenuCard({ item, onClick }) {
  if (!item) return null;

  // Ensure absolute image URL
  let imageUrl = item.image_url;
  if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    imageUrl = `${API_BASE_URL}${imageUrl}`;
  }

  // Fallback if image_url is missing
  const fallbackImage = getPlaceholderImage(item.category_slug || '', item.slug || '');
  const displayImage = imageUrl || fallbackImage;

  return (
    <div className="menu-card animate-scaleIn" onClick={() => onClick && onClick(item)}>
      {/* Item Image Container */}
      <div className="menu-card-image-wrapper">
        <img 
          src={displayImage} 
          alt={item.name} 
          className="menu-card-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        
        {/* Top Badges */}
        <div className="menu-card-badges">
          {item.is_todays_special && <Badge type="special" />}
          {item.is_new && <Badge type="new" />}
          {item.has_discount && <Badge type="discount" text={`-${item.discount_percentage}%`} />}
        </div>

        {/* Veg / Non-Veg Indicator Dot */}
        <div className="menu-card-food-type">
          <span className={`type-dot ${item.food_type}`} title={item.food_type === 'veg' ? 'Veg' : 'Non-Veg'}></span>
        </div>
      </div>

      {/* Item Info */}
      <div className="menu-card-info">
        <div className="menu-card-header">
          <h3 className="menu-card-name">{item.name}</h3>
        </div>
        
        <p className="menu-card-description">{item.description}</p>
        
        <div className="menu-card-footer">
          <div className="menu-card-price-wrapper">
            <span className="menu-card-price">₹{parseFloat(item.price).toFixed(0)}</span>
            {item.has_discount && (
              <span className="menu-card-original-price">₹{parseFloat(item.original_price).toFixed(0)}</span>
            )}
          </div>
          <button className="menu-card-action-btn" aria-label={`View ${item.name}`}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
