from django.core.management.base import BaseCommand
from menu.models import Restaurant, Category, MenuItem


class Command(BaseCommand):
    help = 'Seed the database with The Chai Spot menu data'

    def handle(self, *args, **options):
        self.stdout.write('🌱 Seeding The Chai Spot database...\n')

        # ── Restaurant ──────────────────────────────────────────────
        restaurant, created = Restaurant.objects.get_or_create(
            name='The Chai Spot',
            defaults={
                'tagline': 'Where every sip tells a story',
                'description': (
                    'Welcome to The Chai Spot — your cozy neighborhood cafe '
                    'serving handcrafted chai, premium coffee, fresh bakes, '
                    'and delicious snacks. Every cup is brewed with love and '
                    'the finest ingredients.'
                ),
                'address': '123 Chai Street, Café Lane, Mumbai, India',
                'phone': '+91 98765 43210',
                'email': 'hello@thechaispot.com',
                'opening_hours': '8:00 AM – 10:00 PM',
            }
        )
        action = 'Created' if created else 'Already exists'
        self.stdout.write(f'  ☕ Restaurant: {action}')

        # ── Categories ──────────────────────────────────────────────
        categories_data = [
            {'name': 'Chai',         'icon': '🍵', 'description': 'Our signature hand-brewed chai collection', 'display_order': 1},
            {'name': 'Special Tea',  'icon': '🫖', 'description': 'Exotic and premium tea selections', 'display_order': 2},
            {'name': 'Coffee',       'icon': '☕', 'description': 'Freshly brewed coffee classics', 'display_order': 3},
            {'name': 'Cold Coffee',  'icon': '🧊', 'description': 'Chilled and blended coffee creations', 'display_order': 4},
            {'name': 'Shakes',       'icon': '🥤', 'description': 'Thick and creamy milkshakes', 'display_order': 5},
            {'name': 'Snacks',       'icon': '🥪', 'description': 'Light bites and savory treats', 'display_order': 6},
            {'name': 'Biscuit',      'icon': '🍪', 'description': 'Crunchy biscuits and cookies', 'display_order': 7},
            {'name': 'Bakery',       'icon': '🧁', 'description': 'Freshly baked goods from our oven', 'display_order': 8},
            {'name': 'Fast Food',    'icon': '🍔', 'description': 'Quick bites and filling meals', 'display_order': 9},
            {'name': 'Combo Packs',  'icon': '🎁', 'description': 'Value combos — more for less', 'display_order': 10},
            {'name': 'Dessert',      'icon': '🍰', 'description': 'Sweet endings to your meal', 'display_order': 11},
        ]

        categories = {}
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            categories[cat.name] = cat
            status = '✅' if created else '⏭️'
            self.stdout.write(f'  {status} Category: {cat.name}')

        # ── Menu Items ──────────────────────────────────────────────
        items_data = [
            # ═══ Chai ═══
            {'name': 'Masala Chai', 'category': 'Chai', 'price': 40, 'description': 'Classic Indian tea brewed with aromatic spices — cardamom, ginger, cinnamon & cloves', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Kulhad Chai', 'category': 'Chai', 'price': 50, 'description': 'Traditional clay-pot chai with an earthy aroma and rich flavor', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Adrak Chai', 'category': 'Chai', 'price': 40, 'description': 'Strong ginger-infused tea that warms you from the inside', 'food_type': 'veg'},
            {'name': 'Elaichi Chai', 'category': 'Chai', 'price': 45, 'description': 'Fragrant cardamom tea with a subtle sweetness', 'food_type': 'veg'},
            {'name': 'Tulsi Chai', 'category': 'Chai', 'price': 45, 'description': 'Holy basil infused tea — refreshing and immunity-boosting', 'food_type': 'veg'},
            {'name': 'Cutting Chai', 'category': 'Chai', 'price': 25, 'description': 'Mumbai-style half-glass tea — small but mighty', 'is_popular': True, 'food_type': 'veg'},

            # ═══ Special Tea ═══
            {'name': 'Kashmiri Kahwa', 'category': 'Special Tea', 'price': 90, 'description': 'Premium Kashmiri green tea with saffron, almonds, and warm spices', 'is_bestseller': True, 'food_type': 'veg'},
            {'name': 'Tandoori Chai', 'category': 'Special Tea', 'price': 70, 'description': 'Smoky clay-fired tea — a viral sensation with a unique charred flavor', 'is_todays_special': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Matcha Latte', 'category': 'Special Tea', 'price': 120, 'description': 'Japanese ceremonial-grade matcha whisked with steamed milk', 'is_new': True, 'food_type': 'veg'},
            {'name': 'Rose Tea', 'category': 'Special Tea', 'price': 80, 'description': 'Delicate rose-petal infused tea with a floral finish', 'food_type': 'veg'},
            {'name': 'Lemon Honey Tea', 'category': 'Special Tea', 'price': 60, 'description': 'Light and citrusy tea with raw honey — perfect detox drink', 'food_type': 'veg'},
            {'name': 'Butterfly Pea Tea', 'category': 'Special Tea', 'price': 100, 'description': 'Color-changing blue tea that turns purple with a squeeze of lemon — magical!', 'is_new': True, 'food_type': 'veg'},

            # ═══ Coffee ═══
            {'name': 'Classic Espresso', 'category': 'Coffee', 'price': 80, 'description': 'Bold single-shot espresso with a rich crema', 'food_type': 'veg'},
            {'name': 'Americano', 'category': 'Coffee', 'price': 90, 'description': 'Smooth espresso diluted with hot water — clean and bold', 'food_type': 'veg'},
            {'name': 'Cappuccino', 'category': 'Coffee', 'price': 110, 'description': 'Velvety espresso topped with thick milk foam and cocoa dust', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Café Latte', 'category': 'Coffee', 'price': 120, 'description': 'Silky steamed milk with a shot of espresso — creamy and comforting', 'food_type': 'veg'},
            {'name': 'Mocha', 'category': 'Coffee', 'price': 140, 'description': 'Rich espresso meets chocolate syrup and steamed milk — a chocolate lover\'s dream', 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Filter Coffee', 'category': 'Coffee', 'price': 60, 'description': 'South Indian-style decoction coffee served in a brass tumbler', 'is_bestseller': True, 'food_type': 'veg'},

            # ═══ Cold Coffee ═══
            {'name': 'Classic Cold Coffee', 'category': 'Cold Coffee', 'price': 100, 'description': 'Chilled blended coffee with milk and a touch of vanilla', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Hazelnut Cold Coffee', 'category': 'Cold Coffee', 'price': 140, 'description': 'Nutty hazelnut syrup blended with espresso, milk, and ice', 'food_type': 'veg'},
            {'name': 'Caramel Cold Coffee', 'category': 'Cold Coffee', 'price': 140, 'description': 'Sweet caramel drizzle over iced espresso and creamy milk', 'is_todays_special': True, 'food_type': 'veg'},
            {'name': 'Vietnamese Cold Coffee', 'category': 'Cold Coffee', 'price': 130, 'description': 'Strong dark coffee with sweetened condensed milk — bold and sweet', 'is_new': True, 'food_type': 'veg'},
            {'name': 'Cold Coffee Frappe', 'category': 'Cold Coffee', 'price': 150, 'description': 'Frozen blended coffee frappe topped with whipped cream', 'food_type': 'veg'},

            # ═══ Shakes ═══
            {'name': 'Chocolate Shake', 'category': 'Shakes', 'price': 120, 'description': 'Rich and creamy chocolate milkshake with real cocoa', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Oreo Shake', 'category': 'Shakes', 'price': 140, 'description': 'Crushed Oreo cookies blended with vanilla ice cream and milk', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Strawberry Shake', 'category': 'Shakes', 'price': 130, 'description': 'Fresh strawberry puree blended with creamy milk and ice cream', 'food_type': 'veg'},
            {'name': 'Mango Shake', 'category': 'Shakes', 'price': 120, 'description': 'Seasonal Alphonso mango blended to creamy perfection', 'is_todays_special': True, 'food_type': 'veg'},
            {'name': 'Butterscotch Shake', 'category': 'Shakes', 'price': 130, 'description': 'Buttery caramel and crunchy butterscotch chips in a creamy shake', 'food_type': 'veg'},
            {'name': 'KitKat Shake', 'category': 'Shakes', 'price': 150, 'description': 'Crushed KitKat bars blended with chocolate ice cream — indulgent!', 'is_new': True, 'food_type': 'veg'},

            # ═══ Snacks ═══
            {'name': 'Veg Sandwich', 'category': 'Snacks', 'price': 80, 'description': 'Fresh vegetables layered with mint chutney in toasted bread', 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Cheese Grilled Sandwich', 'category': 'Snacks', 'price': 110, 'description': 'Melted cheese with veggies grilled to golden perfection', 'is_bestseller': True, 'food_type': 'veg'},
            {'name': 'Paneer Tikka Sandwich', 'category': 'Snacks', 'price': 130, 'description': 'Spiced paneer tikka filling with onions and peppers in grilled bread', 'food_type': 'veg'},
            {'name': 'Corn Cheese Toast', 'category': 'Snacks', 'price': 90, 'description': 'Sweet corn and cheese spread on crispy toasted bread', 'food_type': 'veg'},
            {'name': 'Garlic Bread', 'category': 'Snacks', 'price': 80, 'description': 'Buttery garlic bread baked with herbs and mozzarella', 'food_type': 'veg'},
            {'name': 'Aloo Patties', 'category': 'Snacks', 'price': 40, 'description': 'Crispy potato-stuffed puff pastry — a classic tea-time snack', 'is_popular': True, 'food_type': 'veg'},

            # ═══ Biscuit ═══
            {'name': 'Butter Biscuit', 'category': 'Biscuit', 'price': 30, 'description': 'Crumbly, melt-in-your-mouth butter cookies', 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Khari Biscuit', 'category': 'Biscuit', 'price': 25, 'description': 'Flaky and crispy puff pastry biscuit — perfect with chai', 'is_bestseller': True, 'food_type': 'veg'},
            {'name': 'Nankhatai', 'category': 'Biscuit', 'price': 35, 'description': 'Traditional Indian ghee cookies with cardamom fragrance', 'food_type': 'veg'},
            {'name': 'Osmania Biscuit', 'category': 'Biscuit', 'price': 30, 'description': 'Hyderabadi salt-sweet biscuit — iconic Irani café classic', 'food_type': 'veg'},
            {'name': 'Coconut Cookies', 'category': 'Biscuit', 'price': 35, 'description': 'Crunchy coconut-studded cookies with a hint of vanilla', 'food_type': 'veg'},

            # ═══ Bakery ═══
            {'name': 'Chocolate Muffin', 'category': 'Bakery', 'price': 80, 'description': 'Moist double-chocolate muffin with chocolate chips', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Blueberry Muffin', 'category': 'Bakery', 'price': 90, 'description': 'Fluffy muffin bursting with fresh blueberries', 'food_type': 'veg'},
            {'name': 'Croissant', 'category': 'Bakery', 'price': 70, 'description': 'Buttery, flaky French croissant baked golden', 'food_type': 'veg'},
            {'name': 'Puff Pastry', 'category': 'Bakery', 'price': 50, 'description': 'Crispy layered pastry with a savory vegetable filling', 'food_type': 'veg'},
            {'name': 'Banana Bread', 'category': 'Bakery', 'price': 70, 'description': 'Moist banana bread with walnuts — homestyle goodness', 'food_type': 'veg'},
            {'name': 'Cinnamon Roll', 'category': 'Bakery', 'price': 90, 'description': 'Warm swirled cinnamon roll with cream cheese glaze', 'is_todays_special': True, 'food_type': 'veg'},

            # ═══ Fast Food ═══
            {'name': 'Cheese Burger', 'category': 'Fast Food', 'price': 120, 'description': 'Juicy veg patty with melted cheese, lettuce, and special sauce', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Veg Burger', 'category': 'Fast Food', 'price': 90, 'description': 'Classic veg burger with crispy patty and fresh veggies', 'food_type': 'veg'},
            {'name': 'French Fries', 'category': 'Fast Food', 'price': 80, 'description': 'Crispy golden fries seasoned with herb salt', 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Loaded Fries', 'category': 'Fast Food', 'price': 120, 'description': 'Fries topped with cheese sauce, jalapeños, and sour cream', 'is_todays_special': True, 'food_type': 'veg'},
            {'name': 'Peri Peri Fries', 'category': 'Fast Food', 'price': 100, 'description': 'Spicy peri-peri seasoned fries with a kick', 'food_type': 'veg'},
            {'name': 'Pasta Alfredo', 'category': 'Fast Food', 'price': 150, 'description': 'Creamy white sauce pasta with mushrooms and herbs', 'food_type': 'veg'},

            # ═══ Combo Packs ═══
            {'name': 'Chai + Sandwich Combo', 'category': 'Combo Packs', 'price': 99, 'original_price': 120, 'description': 'One Masala Chai + one Veg Sandwich — our most popular combo', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Coffee + Muffin Combo', 'category': 'Combo Packs', 'price': 149, 'original_price': 190, 'description': 'Any hot coffee + a freshly baked muffin of your choice', 'food_type': 'veg'},
            {'name': 'Shake + Burger Combo', 'category': 'Combo Packs', 'price': 199, 'original_price': 240, 'description': 'Any milkshake + any burger — the ultimate meal deal', 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Family Pack', 'category': 'Combo Packs', 'price': 249, 'original_price': 320, 'description': '4 Masala Chai + 2 Sandwiches + 2 Cookies — perfect for sharing', 'is_todays_special': True, 'food_type': 'veg'},
            {'name': 'Student Special', 'category': 'Combo Packs', 'price': 79, 'original_price': 105, 'description': 'Cutting Chai + Aloo Patties + Butter Biscuit — budget-friendly!', 'is_new': True, 'food_type': 'veg'},

            # ═══ Dessert ═══
            {'name': 'Choco Lava Cake', 'category': 'Dessert', 'price': 130, 'description': 'Warm chocolate cake with a molten center — pure indulgence', 'is_bestseller': True, 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Brownie with Ice Cream', 'category': 'Dessert', 'price': 140, 'description': 'Dense fudgy brownie served with vanilla ice cream and chocolate sauce', 'is_bestseller': True, 'food_type': 'veg'},
            {'name': 'Gulab Jamun', 'category': 'Dessert', 'price': 60, 'description': 'Soft milk-solid dumplings soaked in rose-cardamom syrup (2 pcs)', 'is_popular': True, 'food_type': 'veg'},
            {'name': 'Rasgulla', 'category': 'Dessert', 'price': 60, 'description': 'Spongy cottage cheese balls in light sugar syrup (2 pcs)', 'food_type': 'veg'},
            {'name': 'Tiramisu', 'category': 'Dessert', 'price': 180, 'description': 'Italian classic — espresso-soaked ladyfingers with mascarpone cream', 'is_new': True, 'food_type': 'veg'},
            {'name': 'Chocolate Cookies', 'category': 'Dessert', 'price': 50, 'description': 'Chewy chocolate chip cookies baked fresh daily (3 pcs)', 'is_popular': True, 'food_type': 'veg'},
        ]

        created_count = 0
        for item_data in items_data:
            cat_name = item_data.pop('category')
            category = categories.get(cat_name)
            if not category:
                self.stdout.write(self.style.WARNING(f'  ⚠️  Category "{cat_name}" not found, skipping {item_data["name"]}'))
                continue

            item_data['category'] = category
            _, created = MenuItem.objects.get_or_create(
                name=item_data['name'],
                defaults=item_data
            )
            if created:
                created_count += 1

        self.stdout.write(f'\n  🍽️  Menu items: {created_count} created, {len(items_data) - created_count} already existed')
        self.stdout.write(self.style.SUCCESS(f'\n✅ Seeding complete! Total: {len(items_data)} items across {len(categories_data)} categories.'))
