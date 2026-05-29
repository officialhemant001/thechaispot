import { useState } from 'react';
import SearchBar from '../components/Search/SearchBar';
import CategoryNav from '../components/Menu/CategoryNav';
import MenuGrid from '../components/Menu/MenuGrid';
import MenuItemModal from '../components/Menu/MenuItemModal';
import './MenuPage.css';

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="menu-page animate-fadeIn">
      {/* Header Banner for Menu Page */}
      <div className="menu-page-header">
        <div className="container">
          <h1 className="menu-page-title">Our Digital Menu</h1>
          <p className="menu-page-subtitle">Freshly brewed chai, hot coffee, and delicious snacks right at your fingertips</p>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Sticky Category Navbar */}
      <CategoryNav />

      {/* Grid of Menu Items */}
      <MenuGrid onItemClick={setSelectedItem} />

      {/* Expanded Food Details Modal */}
      <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
