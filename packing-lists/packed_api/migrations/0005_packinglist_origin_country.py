# Generated by Django 4.0.3 on 2022-08-03 23:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('packed_api', '0004_packinglistitem_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='packinglist',
            name='origin_country',
            field=models.CharField(max_length=70, null=True),
        ),
    ]
