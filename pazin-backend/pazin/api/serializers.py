from rest_framework import serializers
from .models import Category, Product, Image, Blog


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class MinimalCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'slug']


class MainProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    category = MinimalCategorySerializer(read_only=True)
    default_image = ImageSerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'


class CategoryProductSerializer(serializers.ModelSerializer):
    default_image = ImageSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'default_image', 'slug']


class FeaturedProductSerializer(serializers.ModelSerializer):
    default_image = ImageSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'default_image', 'slug']


class CategorySerializer(serializers.ModelSerializer):
    featured_product = FeaturedProductSerializer(read_only=True)
    products = CategoryProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'