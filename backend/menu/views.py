from rest_framework import generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Restaurant, Category, MenuItem, QRCode
from .serializers import (
    RestaurantSerializer, CategorySerializer,
    MenuItemSerializer, CategoryWithItemsSerializer,
    QRCodeSerializer,
)


class RestaurantDetailView(APIView):
    """GET /api/restaurant/ — Returns the active restaurant details."""

    def get(self, request):
        restaurant = Restaurant.objects.filter(is_active=True).first()
        if restaurant:
            serializer = RestaurantSerializer(restaurant, context={'request': request})
            return Response(serializer.data)
        return Response({'detail': 'No active restaurant found.'}, status=404)


class CategoryListView(generics.ListAPIView):
    """GET /api/categories/ — All active categories."""
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(is_active=True).order_by('display_order')


class MenuItemListView(generics.ListAPIView):
    """
    GET /api/items/ — All available menu items.
    Supports filtering via query params:
      ?category=<slug>
      ?search=<term>
      ?popular=true
      ?bestseller=true
      ?todays_special=true
      ?food_type=veg|non_veg
    """
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        qs = MenuItem.objects.filter(is_available=True).select_related('category')

        # Filter by category slug
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category__slug=category)

        # Search by name or description
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )

        # Boolean filters
        if self.request.query_params.get('popular') == 'true':
            qs = qs.filter(is_popular=True)
        if self.request.query_params.get('bestseller') == 'true':
            qs = qs.filter(is_bestseller=True)
        if self.request.query_params.get('todays_special') == 'true':
            qs = qs.filter(is_todays_special=True)

        # Food type filter
        food_type = self.request.query_params.get('food_type')
        if food_type in ('veg', 'non_veg'):
            qs = qs.filter(food_type=food_type)

        return qs.order_by('display_order', 'name')


class MenuItemDetailView(generics.RetrieveAPIView):
    """GET /api/items/<slug>/ — Single item detail."""
    serializer_class = MenuItemSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return MenuItem.objects.filter(is_available=True).select_related('category')


class FullMenuView(APIView):
    """
    GET /api/menu/ — Combined endpoint returning all categories
    with their items nested inside.
    """

    def get(self, request):
        categories = Category.objects.filter(
            is_active=True
        ).prefetch_related('items').order_by('display_order')

        serializer = CategoryWithItemsSerializer(
            categories, many=True, context={'request': request}
        )
        return Response(serializer.data)


class QRCodeListView(generics.ListAPIView):
    """GET /api/qrcode/ — Active QR codes."""
    serializer_class = QRCodeSerializer

    def get_queryset(self):
        return QRCode.objects.filter(is_active=True)
