from django.contrib import admin
from django.utils.html import format_html
from .models import Restaurant, Category, MenuItem, QRCode


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'tagline', 'phone', 'is_active')
    fieldsets = (
        ('Branding', {
            'fields': ('name', 'tagline', 'description', 'logo', 'banner_image')
        }),
        ('Contact', {
            'fields': ('address', 'phone', 'email', 'opening_hours')
        }),
        ('Social Media', {
            'fields': ('instagram', 'facebook')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('icon', 'name', 'slug', 'display_order', 'item_count', 'is_active')
    list_editable = ('display_order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)
    list_filter = ('is_active',)
    ordering = ('display_order',)


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = (
        'image_preview', 'name', 'category', 'price',
        'food_type_badge', 'is_bestseller', 'is_todays_special',
        'is_popular', 'is_available',
    )
    list_display_links = ('name',)
    list_editable = ('is_bestseller', 'is_todays_special', 'is_popular', 'is_available')
    list_filter = ('category', 'food_type', 'is_bestseller', 'is_todays_special', 'is_popular', 'is_available')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    list_per_page = 30
    ordering = ('category', 'display_order', 'name')

    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'description', 'image', 'category')
        }),
        ('Pricing', {
            'fields': ('price', 'original_price')
        }),
        ('Tags & Badges', {
            'fields': ('food_type', 'is_bestseller', 'is_todays_special', 'is_popular', 'is_new')
        }),
        ('Display', {
            'fields': ('is_available', 'display_order')
        }),
    )

    @admin.display(description='Image')
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width:50px;height:50px;object-fit:cover;border-radius:6px;" />',
                obj.image.url
            )
        return format_html(
            '<div style="width:50px;height:50px;background:#f0e6d3;border-radius:6px;'
            'display:flex;align-items:center;justify-content:center;font-size:20px;">🍽️</div>'
        )

    @admin.display(description='Type')
    def food_type_badge(self, obj):
        if obj.food_type == 'veg':
            return format_html(
                '<span style="color:#22c55e;font-weight:bold;">● Veg</span>'
            )
        return format_html(
            '<span style="color:#ef4444;font-weight:bold;">● Non-Veg</span>'
        )


@admin.register(QRCode)
class QRCodeAdmin(admin.ModelAdmin):
    list_display = ('label', 'url', 'qr_preview', 'is_active', 'created_at')
    list_filter = ('is_active',)

    @admin.display(description='QR Code')
    def qr_preview(self, obj):
        if obj.qr_image:
            return format_html(
                '<img src="{}" style="width:80px;height:80px;" />', obj.qr_image.url
            )
        return '—'


# Customize admin site header
admin.site.site_header = '☕ The Chai Spot — Admin'
admin.site.site_title = 'The Chai Spot Admin'
admin.site.index_title = 'Menu Management'
