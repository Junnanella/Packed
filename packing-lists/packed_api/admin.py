from django.contrib import admin
from .models import Category, PackingList, Item, PackingListItem, Condition

# Register your models here.

@admin.register(PackingList)
class PackingListAdmin(admin.ModelAdmin):
    pass

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass

@admin.register(Condition)
class ConditionAdmin(admin.ModelAdmin):
    pass

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    pass

@admin.register(PackingListItem)
class PackingListItemAdmin(admin.ModelAdmin):
    pass


