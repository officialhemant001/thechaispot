import { useMenu } from '../../context/MenuContext';
import MenuCard from './MenuCard';
import { SkeletonGrid } from '../UI/Loader';
import './MenuGrid.css';

export default function MenuGrid({ onItemClick }) {
  const { getFilteredItems, loading, activeCategory } = useMenu();

  if (loading) {
    return (
      <div className="menu-grid-container container">
        <SkeletonGrid count={8} />
      </div>
    );
  }

  const items = getFilteredItems();

  if (items.length === 0) {
    return (
      <div className="menu-empty-state container animate-fadeIn">
        <div className="empty-icon">🍽️</div>
        <h3>No Menu Items Found</h3>
        <p>We couldn't find any items matching your selection or search query. Try searching for something else or browse another category!</p>
      </div>
    );
  }

  return (
    <div className="menu-grid-container container">
      {/* Grid of items */}
      <div className="menu-grid">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>
    </div>
  );
}
