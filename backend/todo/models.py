from django.db import models
class Task(models.Model):
    title=models.CharField(max_length=255)
    deadline = models.DateField()
    created_date=models.DateField(auto_now_add=True)
    

class detail(models.Model):
    detail_title=models.CharField(max_length=255)
    detail_deadline = models.DateField()
    detail_created_date=models.DateField(auto_now_add=True)
    department = models.ForeignKey(Task, on_delete=models.CASCADE)



# Create your models here.
