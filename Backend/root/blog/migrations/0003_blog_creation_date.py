# Generated by Django 5.0.1 on 2024-01-29 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_blog_thumbnail'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='creation_date',
            field=models.DateField(auto_now=True),
        ),
    ]
