from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=225)
    slug = models.SlugField(max_length=225, unique=True)
    featured_product = models.ForeignKey('Product', on_delete=models.SET_NULL, null=True, blank=True, related_name='featured_in_categories',)

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=225)
    description = models.TextField()
    price = models.PositiveIntegerField()
    slug = models.SlugField(max_length=225, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    
    def __str__(self):
        return self.title

    @property
    def default_image(self):
        if hasattr(self, 'default_image_list'):
            return self.default_image_list[0] if self.default_image_list else None
        return self.images.filter(is_default=True).first()


class Image(models.Model):
    path = models.ImageField(upload_to='products/')
    is_default = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    
    class Meta:
            constraints = [
                models.UniqueConstraint(
                    fields=['product'],
                    condition=models.Q(is_default=True),
                    name='unique_default_image_per_product',
                )
            ]

    def __str__(self):
        return self.path.name
    

class Blog(models.Model):
    title = models.CharField(max_length=225)
    content = models.TextField()
    slug = models.SlugField(max_length=225, unique=True)
    image_path = models.ImageField(upload_to='blogs/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    