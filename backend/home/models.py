from django.db import models


class User(models.Model):
    name = models.CharField(max_length=50)
    student_id = models.CharField(max_length=50)
    research_theme = models.CharField(max_length=200)
    tech_tags = models.ManyToManyField("TechTag", related_name="users")


class TechTag(models.Model):
    name = models.CharField(max_length=50)


class Theme(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()


class Novelty(models.Model):
    description = models.TextField()


class Memo(models.Model):
    description = models.TextField()
