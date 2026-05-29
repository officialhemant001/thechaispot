import { useState } from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import PopularItems from '../components/Home/PopularItems';
import TodaysSpecial from '../components/Home/TodaysSpecial';
import MenuItemModal from '../components/Menu/MenuItemModal';
import './HomePage.css';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="home-page animate-fadeIn">
      {/* Hero Welcome Banner */}
      <HeroBanner />

      {/* Today's Special Section */}
      <TodaysSpecial onItemClick={setSelectedItem} />

      {/* Popular Items Row */}
      <PopularItems onItemClick={setSelectedItem} />

      {/* Detail Modal Overlay */}
      <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
