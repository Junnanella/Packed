from django.db import models

# Create your models here.

# class User(models.Model): 
#     username= models.CharField(max_length=100)
#     email = models.CharField(max_length=150)
#     password = models.CharField(max_length=50)

    # def __str__(self):
    #     return self.username

class PackingList(models.Model):
    name = models.CharField(max_length=100)
    # owner = models.ForeignKey(
    # User,
    # related_name = "packing_list",
    # on_delete=models.CASCADE
    # )
    created = models.DateField()
    travel_date = models.DateField()
    completed = models.BooleanField()
    location = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Category(models.Model):
    category_name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.category_name

class Condition(models.Model): 
    item_condition = models.CharField(max_length=50)

    def __str__(self):
        return self.item_condition

class Item(models.Model):                                   
    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        Category, 
        related_name= "items", 
        on_delete= models.CASCADE
    )
    suggested = models.BooleanField()
    condition = models.ManyToManyField(Condition)
    # users_item = models.ForeignKey(             *****
    # User, 
    # related_name = "users_packing_list_items", 
    # on_delete - models.CASCADE
    # )
    user_item = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.name

class PackingListItem(models.Model): 
    item = models.ForeignKey(
        Item, 
        related_name="packing_list_item",
        on_delete= models.CASCADE 
    )
    owner = models.PositiveIntegerField(null=True)
    quantity = models.PositiveIntegerField(), 
    packed = models.BooleanField()
    packing_list = models.ForeignKey(
        PackingList, 
        related_name="packing_list",
        on_delete= models.CASCADE
    )  

    def __str__(self):
        return self.item


                    


