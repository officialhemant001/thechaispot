from django.db import models
from django.utils.text import slugify


class Restaurant(models.Model):
    """Stores cafe/restaurant details - typically just one record."""
    name = models.CharField(max_length=200, default='The Chai Spot')
    tagline = models.CharField(max_length=300, blank=True, default='Where every sip tells a story')
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='restaurant/', blank=True, null=True)
    banner_image = models.ImageField(upload_to='restaurant/', blank=True, null=True)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    opening_hours = models.CharField(max_length=200, blank=True, default='8:00 AM - 10:00 PM')
    instagram = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Restaurant'
        verbose_name_plural = 'Restaurant'

    def __str__(self):
        return self.name


class Category(models.Model):
    """Menu categories like Chai, Coffee, Snacks, etc."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=10, blank=True, help_text='Emoji icon for the category')
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['display_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.icon} {self.name}" if self.icon else self.name

    @property
    def item_count(self):
        return self.items.filter(is_available=True).count()


class MenuItem(models.Model):
    """Individual menu items belonging to a category."""
    VEG = 'veg'
    NON_VEG = 'non_veg'
    FOOD_TYPE_CHOICES = [
        (VEG, 'Vegetarian'),
        (NON_VEG, 'Non-Vegetarian'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    original_price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True,
        help_text='Original price before discount (leave blank if no discount)'
    )
    image = models.ImageField(upload_to='menu_items/', blank=True, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='items'
    )
    food_type = models.CharField(
        max_length=10, choices=FOOD_TYPE_CHOICES, default=VEG
    )
    is_bestseller = models.BooleanField(default=False)
    is_todays_special = models.BooleanField(default=False)
    is_popular = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
            # Ensure uniqueness
            original_slug = self.slug
            counter = 1
            while MenuItem.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    @property
    def has_discount(self):
        return self.original_price and self.original_price > self.price

    @property
    def discount_percentage(self):
        if self.has_discount:
            return int(((self.original_price - self.price) / self.original_price) * 100)
        return 0


class QRCode(models.Model):
    """QR codes linking to the menu."""
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name='qr_codes'
    )
    label = models.CharField(max_length=200, default='Main Menu QR')
    url = models.URLField(help_text='URL the QR code points to')
    qr_image = models.ImageField(upload_to='qrcodes/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'QR Code'
        verbose_name_plural = 'QR Codes'

    def __str__(self):
        return f"{self.label} - {self.url}"
