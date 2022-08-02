from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser): 
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class PackingList(models.Model):
    title = models.CharField(max_length=100, default="My Packing List")
    owner = models.ForeignKey(
        User,
        related_name = "packing_lists",
        on_delete=models.CASCADE
    )
    created = models.DateField(auto_now_add=True)
    departure_date = models.CharField(max_length=10, blank=True)
    return_date = models.CharField(max_length=10, blank=True)
    completed = models.BooleanField(default=False)
    destination_city = models.CharField(max_length=70, blank=True)
    destination_country = models.CharField(max_length=70, blank=True)
    
    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class Condition(models.Model): 
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Item(models.Model):                                   
    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        Category, 
        related_name="items", 
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    suggested = models.BooleanField()
    condition = models.ForeignKey(
        "Condition",
        related_name="items",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.name


class PackingListItem(models.Model): 
    item_name = models.ForeignKey(
        Item, 
        related_name="packing_lists",
        on_delete= models.CASCADE 
    )
    owner = models.ForeignKey(
        User, related_name="packing_list_items",
         on_delete=models.CASCADE, null=True
    )
    quantity = models.PositiveIntegerField()
    packed = models.BooleanField(default=False)
    packing_list = models.ForeignKey(
        PackingList, 
        related_name="items",
        on_delete= models.CASCADE
    )

    def __str__(self):
        return f"{self.item_name.name} ({self.quantity}) for {self.packing_list.title}"
