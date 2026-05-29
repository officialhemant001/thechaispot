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
      
      let restaurantData;
      let menuData;

      // Determine if we should bypass localhost Django server and immediately load static JSON files
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const hasCustomApiUrl = !!import.meta.env.VITE_API_URL;

      if (!isLocalhost && !hasCustomApiUrl) {
        console.log('Production mode (static fallback): fetching from local public JSONs');
        const [restaurantRes, menuRes] = await Promise.all([
          fetch('/restaurant.json').then(r => {
            if (!r.ok) throw new Error('Static restaurant.json not found');
            return r.json();
          }),
          fetch('/menu.json').then(r => {
            if (!r.ok) throw new Error('Static menu.json not found');
            return r.json();
          })
        ]);
        restaurantData = restaurantRes;
        menuData = menuRes;
      } else {
        try {
          console.log('Fetching menu and restaurant data from backend API...');
          const [restaurantRes, menuRes] = await Promise.all([
            fetchRestaurant(),
            fetchMenu(),
          ]);
          restaurantData = restaurantRes.data;
          menuData = menuRes.data;
        } catch (apiErr) {
          console.warn('Django API fetch failed, trying static fallback JSONs...', apiErr);
          const [restaurantRes, menuRes] = await Promise.all([
            fetch('/restaurant.json').then(r => {
              if (!r.ok) throw new Error('Static restaurant.json not found');
              return r.json();
            }),
            fetch('/menu.json').then(r => {
              if (!r.ok) throw new Error('Static menu.json not found');
              return r.json();
            })
          ]);
          restaurantData = restaurantRes;
          menuData = menuRes;
        }
      }

      // Enrich menu items with category slugs
      const enrichedMenuData = menuData.map(cat => ({
        ...cat,
        items: (cat.items || []).map(item => ({
          ...item,
          category_slug: cat.slug
        }))
      }));

      setRestaurant(restaurantData);
      setMenuData(enrichedMenuData);

      // Flatten all items from all categories
      const items = enrichedMenuData.reduce((acc, cat) => [...acc, ...(cat.items || [])], []);
      setAllItems(items);

      // Extract category list
      setCategories(enrichedMenuData.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        item_count: (cat.items || []).length,
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
    let items = allItems || [];

    if (activeCategory !== 'all') {
      const cat = menuData.find(c => c.slug === activeCategory);
      items = cat ? (cat.items || []) : [];
    }

    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(item => {
        const nameMatch = item.name && typeof item.name === 'string' && item.name.toLowerCase().includes(query);
        const descMatch = item.description && typeof item.description === 'string' && item.description.toLowerCase().includes(query);
        const categoryMatch = item.category_name && typeof item.category_name === 'string' && item.category_name.toLowerCase().includes(query);
        return !!(nameMatch || descMatch || categoryMatch);
      });
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
