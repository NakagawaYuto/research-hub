from django.db import models


class User(models.Model):
    name = models.CharField(max_length=50)
    student_id = models.CharField(max_length=50)
    research_theme = models.CharField(max_length=200)
    # TODO: 技術タグ


class Theme(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()


class Novelty(models.Model):
    description = models.TextField()
