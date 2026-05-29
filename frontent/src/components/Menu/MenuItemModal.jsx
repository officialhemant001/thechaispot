import { useEffect } from 'react';
import { FiX, FiInfo, FiClock } from 'react-icons/fi';
import { getPlaceholderImage } from '../../utils/constants';
import Badge from '../UI/Badge';
import './MenuItemModal.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function MenuItemModal({ item, onClose }) {
  // Prevent scrolling on background when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  // Ensure absolute image URL
  let imageUrl = item.image_url;
  if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    imageUrl = `${API_BASE_URL}${imageUrl}`;
  }

  const fallbackImage = getPlaceholderImage(item.category_slug || '', item.slug || '');
  const displayImage = imageUrl || fallbackImage;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <FiX />
        </button>

        {/* Modal Grid */}
        <div className="modal-grid">
          {/* Left Column: Image */}
          <div className="modal-image-wrapper">
            <img 
              src={displayImage} 
              alt={item.name} 
              className="modal-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />
          </div>

          {/* Right Column: Details */}
          <div className="modal-details">
            <div className="modal-meta">
              <span className="modal-category">{item.category_name}</span>
              <div className="modal-food-type">
                <span className={`modal-type-dot ${item.food_type}`}></span>
                <span className="modal-type-text">{item.food_type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
              </div>
            </div>

            <h2 className="modal-title">{item.name}</h2>
            
            <p className="modal-description">{item.description}</p>

            {/* Price section */}
            <div className="modal-price-section">
              <span className="price-label">Price:</span>
              <div className="modal-pricing">
                <span className="modal-price">₹{parseFloat(item.price).toFixed(0)}</span>
                {item.has_discount && (
                  <>
                    <span className="modal-original-price">₹{parseFloat(item.original_price).toFixed(0)}</span>
                    <span className="modal-discount-tag">Save {item.discount_percentage}%</span>
                  </>
                )}
              </div>
            </div>

            {/* Micro-notes for authentic cafe experience */}
            <div className="modal-info-notes">
              <div className="info-note">
                <FiClock className="note-icon" />
                <span>Prepared Fresh: 5-10 mins</span>
              </div>
              <div className="info-note">
                <FiInfo className="note-icon" />
                <span>Allergens: Contains dairy (can be customized)</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-action-primary" onClick={onClose}>
                Done Browsing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
