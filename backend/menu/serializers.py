from rest_framework import serializers
from .models import Restaurant, Category, MenuItem, QRCode


class RestaurantSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    banner_url = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'tagline', 'description', 'logo_url', 'banner_url',
            'address', 'phone', 'email', 'opening_hours',
            'instagram', 'facebook', 'is_active',
        ]

    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None

    def get_banner_url(self, obj):
        if obj.banner_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.banner_image.url)
            return obj.banner_image.url
        return None


class MenuItemSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)
    has_discount = serializers.BooleanField(read_only=True)
    discount_percentage = serializers.IntegerField(read_only=True)

    class Meta:
        model = MenuItem
        fields = [
            'id', 'name', 'slug', 'description', 'price', 'original_price',
            'image_url', 'category', 'category_name', 'food_type',
            'is_bestseller', 'is_todays_special', 'is_popular', 'is_new',
            'is_available', 'has_discount', 'discount_percentage',
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class CategorySerializer(serializers.ModelSerializer):
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'icon',
            'display_order', 'is_active', 'item_count',
        ]


class CategoryWithItemsSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'icon',
            'display_order', 'item_count', 'items',
        ]

    def get_items(self, obj):
        items = obj.items.filter(is_available=True).order_by('display_order', 'name')
        return MenuItemSerializer(items, many=True, context=self.context).data


class QRCodeSerializer(serializers.ModelSerializer):
    qr_image_url = serializers.SerializerMethodField()

    class Meta:
        model = QRCode
        fields = ['id', 'label', 'url', 'qr_image_url', 'is_active', 'created_at']

    def get_qr_image_url(self, obj):
        if obj.qr_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.qr_image.url)
            return obj.qr_image.url
        return None
