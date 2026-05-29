from django.urls import path
from . import views

urlpatterns = [
    path('restaurant/', views.RestaurantDetailView.as_view(), name='restaurant-detail'),
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('items/', views.MenuItemListView.as_view(), name='menu-item-list'),
    path('items/<slug:slug>/', views.MenuItemDetailView.as_view(), name='menu-item-detail'),
    path('menu/', views.FullMenuView.as_view(), name='full-menu'),
    path('qrcode/', views.QRCodeListView.as_view(), name='qrcode-list'),
]
