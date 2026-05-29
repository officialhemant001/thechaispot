import { useMenu } from '../../context/MenuContext';
import './CategoryNav.css';

export default function CategoryNav() {
  const { categories, activeCategory, setActiveCategory } = useMenu();

  return (
    <div className="category-nav-outer glass">
      <div className="category-nav-inner container">
        <div className="category-pills">
          {/* Default 'All' Category */}
          <button
            className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <span className="pill-icon">🍽️</span>
            <span className="pill-name">All Items</span>
          </button>

          {/* Dynamic Categories */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill ${activeCategory === cat.slug ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.slug)}
            >
              <span className="pill-icon">{cat.icon}</span>
              <span className="pill-name">{cat.name}</span>
              {cat.item_count > 0 && <span className="pill-count">{cat.item_count}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
