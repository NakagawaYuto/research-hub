from django.db import models
from home.models import User


class Trouble(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    name = models.CharField(max_length=255, null=True)
    body = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    trouble = models.ForeignKey(Trouble, related_name="comments", on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True)
    body = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True, null=True)
