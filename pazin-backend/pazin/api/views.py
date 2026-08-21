from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from django.db.models import Prefetch
from .serializers import MainProductSerializer, CategorySerializer, BlogSerializer
from .models import Product, Category, Image, Blog


class ProductPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 48


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.select_related('category').prefetch_related('images').all().order_by('-id')
    serializer_class = MainProductSerializer
    lookup_field = 'slug'
    pagination_class = ProductPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        if search:
            queryset = queryset.filter(title__icontains=search)
        return queryset


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.select_related('featured_product').prefetch_related(
        Prefetch('featured_product__images', queryset=Image.objects.filter(is_default=True), to_attr='default_image_list'),
        Prefetch('products', queryset=Product.objects.order_by('-id')[:8], to_attr='limited_products'),
        Prefetch('products__images', queryset=Image.objects.filter(is_default=True), to_attr='default_image_list'),
    ).order_by('-id')
    serializer_class = CategorySerializer


class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    lookup_field = 'slug'