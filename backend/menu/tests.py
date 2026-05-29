from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Restaurant, Category, MenuItem, QRCode


class MenuAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create active restaurant
        self.restaurant = Restaurant.objects.create(
            name='The Chai Spot Test',
            tagline='Cozy test environment',
            description='Serving simulated snacks.',
            address='456 PyTest Avenue',
            phone='+91 99999 88888',
            email='test@thechaispot.com',
            opening_hours='10:00 AM – 8:00 PM',
            is_active=True
        )

        # Create active category
        self.category_chai = Category.objects.create(
            name='Chai',
            description='Test Chai category',
            icon='🍵',
            display_order=1,
            is_active=True
        )
        self.category_coffee = Category.objects.create(
            name='Coffee',
            description='Test Coffee category',
            icon='☕',
            display_order=2,
            is_active=True
        )

        # Create menu items
        self.item_masala = MenuItem.objects.create(
            name='Masala Chai',
            description='Spiced tea classic',
            price=40.00,
            category=self.category_chai,
            food_type='veg',
            is_bestseller=True,
            is_popular=True,
            is_available=True
        )
        self.item_filter = MenuItem.objects.create(
            name='Filter Coffee',
            description='South Indian decoction coffee',
            price=60.00,
            category=self.category_coffee,
            food_type='veg',
            is_todays_special=True,
            is_available=True
        )

        # Create QR Code
        self.qrcode = QRCode.objects.create(
            restaurant=self.restaurant,
            label='Main Menu Test QR',
            url='https://the-chai-spot.vercel.app/menu',
            is_active=True
        )

    def test_restaurant_detail_api(self):
        url = reverse('restaurant-detail')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'The Chai Spot Test')
        self.assertEqual(response.data['tagline'], 'Cozy test environment')

    def test_category_list_api(self):
        url = reverse('category-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'Chai')
        self.assertEqual(response.data[1]['name'], 'Coffee')

    def test_menu_item_list_api(self):
        url = reverse('menu-item-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_menu_item_filtering(self):
        url = reverse('menu-item-list')
        
        # Filter by category
        response = self.client.get(url, {'category': 'chai'})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Masala Chai')

        # Filter by popular tag
        response = self.client.get(url, {'popular': 'true'})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Masala Chai')

        # Filter by today's special tag
        response = self.client.get(url, {'todays_special': 'true'})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Filter Coffee')

        # Search matching 'coffee'
        response = self.client.get(url, {'search': 'coffee'})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Filter Coffee')

    def test_full_menu_nested_api(self):
        url = reverse('full-menu')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        # Check nested item fields
        self.assertEqual(response.data[0]['name'], 'Chai')
        self.assertEqual(len(response.data[0]['items']), 1)
        self.assertEqual(response.data[0]['items'][0]['name'], 'Masala Chai')

    def test_qrcode_list_api(self):
        url = reverse('qrcode-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['label'], 'Main Menu Test QR')
