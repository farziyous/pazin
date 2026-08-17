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

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        
        if is_new and not self.product.images.exists():
            self.is_default = True

        if self.is_default:
            Image.objects.filter(
                product_id=self.product_id, is_default=True
            ).exclude(pk=self.pk).update(is_default=False)

        super().save(*args, **kwargs)
        self._ensure_default_exists()

    def delete(self, *args, **kwargs):
        product = self.product
        super().delete(*args, **kwargs)
        self._ensure_default_exists(product)

    @staticmethod
    def _ensure_default_exists(product=None):
        """
        Safety net: if a product has images but none is marked default
        (e.g. the default was just deleted), promote the earliest
        remaining image to default automatically.
        """
        if product is None:
            return
        if product.images.exists() and not product.images.filter(is_default=True).exists():
            replacement = product.images.order_by('id').first()
            if replacement:
                Image.objects.filter(pk=replacement.pk).update(is_default=True)


class Blog(models.Model):
    title = models.CharField(max_length=225)
    content = models.TextField()
    slug = models.SlugField(max_length=225, unique=True)
    image_path = models.ImageField(upload_to='blogs/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title