from django.db import models

# Create your models here.
class Cards(models.Model):
    serial = models.CharField(max_length=90)
    number_card = models.CharField(max_length=90)
    date_end = models.CharField(max_length=90)