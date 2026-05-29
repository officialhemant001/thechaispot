import { useMenu } from '../../context/MenuContext';
import { FiPhone, FiMail, FiMapPin, FiClock, FiInstagram, FiFacebook } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  const { restaurant } = useMenu();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand Info */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-emoji">🍵</span>
            <h3>{restaurant?.name || 'The Chai Spot'}</h3>
          </div>
          <p className="footer-tagline">{restaurant?.tagline || 'Where every sip tells a story'}</p>
          <p className="footer-description">
            Experience the finest handcrafted chai, brewed fresh with rich Indian spices, alongside an array of delicious snacks and desserts.
          </p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <FiFacebook />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li>
              <FiMapPin className="contact-icon" />
              <span>{restaurant?.address || '123 Chai Street, Café Lane, Mumbai, India'}</span>
            </li>
            <li>
              <FiPhone className="contact-icon" />
              <a href={`tel:${restaurant?.phone}`}>{restaurant?.phone || '+91 98765 43210'}</a>
            </li>
            <li>
              <FiMail className="contact-icon" />
              <a href={`mailto:${restaurant?.email}`}>{restaurant?.email || 'hello@thechaispot.com'}</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div className="footer-hours">
          <h4>Opening Hours</h4>
          <div className="hours-card">
            <FiClock className="hours-icon" />
            <div>
              <p className="days">Monday – Sunday</p>
              <p className="time">{restaurant?.opening_hours || '8:00 AM – 10:00 PM'}</p>
            </div>
          </div>
          <p className="delivery-note">📍 Dine-in & Takeaway only. Order at the counter.</p>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {currentYear} {restaurant?.name || 'The Chai Spot'}. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
