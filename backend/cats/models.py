from django.db import models

# Create your models here.


class Cat(models.Model):
    breed = models.CharField(max_length=200)
    description = models.URLField()
    cat_image = models.URLField()
