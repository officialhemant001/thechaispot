// Category emoji icon mapping
export const CATEGORY_ICONS = {
  'chai': '🍵',
  'special-tea': '🫖',
  'coffee': '☕',
  'cold-coffee': '🧊',
  'shakes': '🥤',
  'snacks': '🥪',
  'biscuit': '🍪',
  'bakery': '🧁',
  'fast-food': '🍔',
  'combo-packs': '🎁',
  'dessert': '🍰',
};

// Generic fallback food images based on category (Clean, no people/faces)
export const PLACEHOLDER_IMAGES = {
  'chai': 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&h=380&fit=crop',
  'special-tea': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&h=380&fit=crop',
  'coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=380&fit=crop',
  'cold-coffee': 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=380&fit=crop',
  'shakes': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=380&fit=crop',
  'snacks': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=380&fit=crop',
  'biscuit': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&h=380&fit=crop',
  'bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=380&fit=crop',
  'fast-food': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=380&fit=crop',
  'combo-packs': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=380&fit=crop',
  'dessert': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=380&fit=crop',
};

// Item-specific high-quality food & drink images (Clean, no people/faces)
export const ITEM_IMAGES = {
  // --- Chai ---
  'masala-chai': 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&h=380&fit=crop',
  'kulhad-chai': 'https://images.unsplash.com/photo-1626808642875-0aa5454f2ef8?w=500&h=380&fit=crop',
  'adrak-chai': 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&h=380&fit=crop',
  'elaichi-chai': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&h=380&fit=crop',
  'tulsi-chai': 'https://images.unsplash.com/photo-1512270997274-e75147dd7943?w=500&h=380&fit=crop',
  'cutting-chai': 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&h=380&fit=crop',

  // --- Special Tea ---
  'kashmiri-kahwa': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&h=380&fit=crop',
  'tandoori-chai': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&h=380&fit=crop',
  'matcha-latte': 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&h=380&fit=crop',
  'rose-tea': 'https://images.unsplash.com/photo-1594911774802-8822a707cbb3?w=500&h=380&fit=crop',
  'lemon-honey-tea': 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=500&h=380&fit=crop',
  'butterfly-pea-tea': 'https://images.unsplash.com/photo-1598934575971-f92e76e5d8ff?w=500&h=380&fit=crop',

  // --- Coffee ---
  'classic-espresso': 'https://images.unsplash.com/photo-1510707577719-094119f86428?w=500&h=380&fit=crop',
  'americano': 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500&h=380&fit=crop',
  'cappuccino': 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&h=380&fit=crop',
  'cafe-latte': 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?w=500&h=380&fit=crop',
  'mocha': 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500&h=380&fit=crop',
  'filter-coffee': 'https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=500&h=380&fit=crop',

  // --- Cold Coffee ---
  'classic-cold-coffee': 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=380&fit=crop',
  'hazelnut-cold-coffee': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=380&fit=crop',
  'caramel-cold-coffee': 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=500&h=380&fit=crop',
  'vietnamese-cold-coffee': 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&h=380&fit=crop',
  'cold-coffee-frappe': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=380&fit=crop',

  // --- Shakes ---
  'chocolate-shake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=380&fit=crop',
  'oreo-shake': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&h=380&fit=crop',
  'strawberry-shake': 'https://images.unsplash.com/photo-1553787499-6f9133860275?w=500&h=380&fit=crop',
  'mango-shake': 'https://images.unsplash.com/photo-1530263003720-e226fbc7a81a?w=500&h=380&fit=crop',
  'butterscotch-shake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=380&fit=crop',
  'kitkat-shake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=380&fit=crop',

  // --- Snacks ---
  'veg-sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=380&fit=crop',
  'cheese-grilled-sandwich': 'https://images.unsplash.com/photo-1528736235302-5292adbdf6c6?w=500&h=380&fit=crop',
  'paneer-tikka-sandwich': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=380&fit=crop',
  'corn-cheese-toast': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=380&fit=crop',
  'garlic-bread': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&h=380&fit=crop',
  'aloo-patties': 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&h=380&fit=crop',

  // --- Biscuit ---
  'butter-biscuit': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&h=380&fit=crop',
  'khari-biscuit': 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500&h=380&fit=crop',
  'nankhatai': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&h=380&fit=crop',
  'osmania-biscuit': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&h=380&fit=crop',
  'coconut-cookies': 'https://images.unsplash.com/photo-1499636136210-6f4ee912704e?w=500&h=380&fit=crop',

  // --- Bakery ---
  'chocolate-muffin': 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&h=380&fit=crop',
  'blueberry-muffin': 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&h=380&fit=crop',
  'croissant': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=380&fit=crop',
  'puff-pastry': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&h=380&fit=crop',
  'banana-bread': 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&h=380&fit=crop',
  'cinnamon-roll': 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&h=380&fit=crop',

  // --- Fast Food ---
  'cheese-burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=380&fit=crop',
  'veg-burger': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=380&fit=crop',
  'french-fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=380&fit=crop',
  'loaded-fries': 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=500&h=380&fit=crop',
  'peri-peri-fries': 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&h=380&fit=crop',
  'pasta-alfredo': 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&h=380&fit=crop',

  // --- Combo Packs ---
  'chai-sandwich-combo': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=380&fit=crop',
  'coffee-muffin-combo': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=380&fit=crop',
  'shake-burger-combo': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=380&fit=crop',
  'family-pack': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=380&fit=crop',
  'student-special': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=380&fit=crop',

  // --- Dessert ---
  'choco-lava-cake': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=380&fit=crop',
  'brownie-with-ice-cream': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=380&fit=crop',
  'gulab-jamun': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&h=380&fit=crop',
  'rasgulla': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&h=380&fit=crop',
  'tiramisu': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=380&fit=crop',
  'chocolate-cookies': 'https://images.unsplash.com/photo-1499636136210-6f4ee912704e?w=500&h=380&fit=crop',
};

export const getPlaceholderImage = (categorySlug, itemSlug = '') => {
  // If specific item image is mapped, prioritize it
  if (itemSlug && ITEM_IMAGES[itemSlug]) {
    return ITEM_IMAGES[itemSlug];
  }
  // Otherwise, fall back to category image
  return PLACEHOLDER_IMAGES[categorySlug] || PLACEHOLDER_IMAGES['chai'];
};
