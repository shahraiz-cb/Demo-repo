# Generated by Django 2.2.28 on 2023-05-20 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_pet_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='imageUrl',
            field=models.URLField(blank=True, null=True),
        ),
    ]