from django.db import models
from home.models import User

class Todo(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    deadline = models.DateField()
    created_date = models.DateField(auto_now_add=True)
    done = models.BooleanField(default=False)


class Detail(models.Model):
    detail_title = models.CharField(max_length=255)
    detail_deadline = models.DateField()
    detail_created_date = models.DateField(auto_now_add=True)
    done = models.BooleanField(default=False)
    department = models.ForeignKey(Todo, on_delete=models.CASCADE)
