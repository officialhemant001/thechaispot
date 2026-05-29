import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useMenu } from '../../context/MenuContext';
import DarkModeToggle from '../UI/DarkModeToggle';
import './Header.css';

export default function Header() {
  const { restaurant } = useMenu();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`header glass ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container container">
        {/* Logo/Branding */}
        <Link to="/" className="logo-link">
          <div className="logo-icon">🍵</div>
          <span className="logo-text">{restaurant?.name || 'The Chai Spot'}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Menu
          </NavLink>
        </nav>

        {/* Actions (Search button, Theme, QR Code, Mobile Toggle) */}
        <div className="header-actions">
          <Link to="/menu" className="action-button search-trigger" aria-label="Search Menu">
            <FiSearch />
          </Link>
          <DarkModeToggle />
          
          {/* Mobile Menu Trigger */}
          <button 
            className="mobile-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer glass ${isOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/menu" 
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            Menu
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
