from django.db import models


class TechTag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class User(models.Model):
    name = models.CharField(max_length=50)
    student_id = models.CharField(max_length=50)
    research_theme = models.CharField(max_length=200, null=True)
    novelty = models.TextField(null=True)
    memo = models.TextField(null=True)
    tech_tags = models.ManyToManyField(TechTag, related_name="users", blank=True)

    def __str__(self):
        return self.name
