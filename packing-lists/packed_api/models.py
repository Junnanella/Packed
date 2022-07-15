from django.db import models

# Create your models here.

class Category(models.Model):
    title = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.title


# class Item(models.Model):
#     name = models.CharField(max_length=50)
#     category = models.ForeignKey("Category", related_name="items", on_delete=models.CASCADE)

#     def __str__(self):
#         return self.name
