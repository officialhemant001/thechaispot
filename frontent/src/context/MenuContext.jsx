import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchMenu, fetchRestaurant, fetchCategories } from '../api/axios';

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [restaurantRes, menuRes] = await Promise.all([
        fetchRestaurant(),
        fetchMenu(),
      ]);

      // Enrich menu items with category slugs
      const enrichedMenuData = menuRes.data.map(cat => ({
        ...cat,
        items: cat.items.map(item => ({
          ...item,
          category_slug: cat.slug
        }))
      }));

      setRestaurant(restaurantRes.data);
      setMenuData(enrichedMenuData);

      // Flatten all items from all categories
      const items = enrichedMenuData.reduce((acc, cat) => [...acc, ...cat.items], []);
      setAllItems(items);

      // Extract category list
      setCategories(enrichedMenuData.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        item_count: cat.items.length,
      })));
    } catch (err) {
      console.error('Failed to load menu data:', err);
      setError('Failed to load menu. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filtered items based on search and active category
  const getFilteredItems = useCallback(() => {
    let items = allItems;

    if (activeCategory !== 'all') {
      const cat = menuData.find(c => c.slug === activeCategory);
      items = cat ? cat.items : [];
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category_name.toLowerCase().includes(query)
      );
    }

    return items;
  }, [allItems, menuData, activeCategory, searchQuery]);

  const getPopularItems = useCallback(() => {
    return allItems.filter(item => item.is_popular);
  }, [allItems]);

  const getBestsellers = useCallback(() => {
    return allItems.filter(item => item.is_bestseller);
  }, [allItems]);

  const getTodaysSpecials = useCallback(() => {
    return allItems.filter(item => item.is_todays_special);
  }, [allItems]);

  const value = {
    restaurant,
    categories,
    menuData,
    allItems,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    getFilteredItems,
    getPopularItems,
    getBestsellers,
    getTodaysSpecials,
    reload: loadData,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
}
