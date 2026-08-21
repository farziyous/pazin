from rest_framework import viewsets
from django.db.models import Prefetch
from .serializers import MainProductSerializer, CategorySerializer, BlogSerializer
from .models import Product, Category, Image, Blog


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.select_related('category').prefetch_related('images').all().order_by('-id')
    serializer_class = MainProductSerializer
    lookup_field = 'slug'


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.select_related('featured_product').prefetch_related(
        Prefetch('featured_product__images', queryset=Image.objects.filter(is_default=True), to_attr='default_image_list'),
        Prefetch('products', queryset=Product.objects.order_by('-id')),
        Prefetch('products__images', queryset=Image.objects.filter(is_default=True), to_attr='default_image_list'),
    ).order_by('-id')
    serializer_class = CategorySerializer


class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    lookup_field = 'slug'