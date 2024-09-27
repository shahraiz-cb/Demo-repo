from django.conf import settings
from django.db import models
class Pet(models.Model):
    'Generated Model'
    name = models.CharField(max_length=100,)
    type = models.CharField(max_length=200,)
    isfavorite = models.BooleanField()
    date_adopted = models.DateField()
    description = models.TextField()
    attributes = models.TextField()
    userid = models.CharField(max_length=100,)
    user = models.ForeignKey("users.User",null=True,blank=True,on_delete=models.SET_NULL,related_name="pet_user",)
    imageUrl = models.URLField(null=True,blank=True,)
