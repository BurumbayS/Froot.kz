from django.db import models

# Create your models here.
class Invoice(models.Model) :
    create_date = models.DateField()
    number = models.CharField(max_length = 30)
    supply_date = models.DateField()
    comment = models.TextField()
