from datetime import timezone
from django.db import models


class Trouble(models.Model):
    title = models.CharField(max_length=255)
    body = models.Text()
    created_date = models.DateTimeField(default=timezone.now())
    updated_date = models.DateTimeField(default=timezone.now())


class Comment(models.Model):
    trouble = models.ForeignKey(Trouble, on_delete=models.CASCADE)
    body = models.TextField()
