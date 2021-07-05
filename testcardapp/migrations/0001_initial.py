# Generated by Django 3.1.3 on 2021-07-02 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cards',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serial', models.IntegerField(max_length=4)),
                ('number_card', models.IntegerField(max_length=6)),
                ('date_end', models.DateField()),
            ],
        ),
    ]
