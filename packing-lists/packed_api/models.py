from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class PackingList(models.Model):
    title = models.CharField(max_length=100, default="My Packing List")
    owner = models.ForeignKey(
        User, related_name="packing_lists", on_delete=models.CASCADE
    )
    created = models.DateField(auto_now_add=True)
    departure_date = models.CharField(max_length=10, blank=True)
    return_date = models.CharField(max_length=10, blank=True)
    completed = models.BooleanField(default=False)
    destination_city = models.CharField(max_length=70, blank=True)
    destination_country = models.CharField(max_length=70, blank=True)
    origin_country = models.CharField(max_length=70, null=True)

    def __str__(self):
        return self.title

# the category model holds categories for items a user can pack such as
# electronics or clothing 
class Category(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

# the condition model holds values for climate conditions such as hot, 
# cold and moderate. This allows us to determine items to suggest for the
# user's trip. We compare the weather data from their location to the items
# listed under our conditions to make that determination.
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

# the packing list item model holds the information for the user's packing list(s)
# once they create it. The user can go back and select whether or not an item
# is packed and update the list of items. 
class PackingListItem(models.Model):
    item_name = models.ForeignKey(
        Item, related_name="packing_lists", on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        User, related_name="packing_list_items", on_delete=models.CASCADE, null=True
    )
    quantity = models.PositiveIntegerField()
    packed = models.BooleanField(default=False)
    packing_list = models.ForeignKey(
        PackingList, related_name="items", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.item_name.name} ({self.quantity}) for {self.packing_list.title}"
