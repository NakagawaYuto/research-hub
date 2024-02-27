from rest_framework import serializers
from .models import User, TechTag, Theme, Novelty


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class TechTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechTag
        fields = "__all__"


class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = "__all__"


class NoveltySerializer(serializers.ModelSerializer):
    class Meta:
        model = Novelty
        fields = "__all__"
