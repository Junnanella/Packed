# Generated by Django 4.0.3 on 2022-08-02 22:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('packed_api', '0003_remove_packinglistitem_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='packinglistitem',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='packing_list_items', to=settings.AUTH_USER_MODEL),
        ),
    ]