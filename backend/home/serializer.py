from rest_framework import serializers
from .models import TechTag, User


class TechTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechTag
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    tech_tags = serializers.PrimaryKeyRelatedField(
        queryset=TechTag.objects.all(), many=True, required=False
    )

    class Meta:
        model = User
        fields = ['id', 'name', 'student_id',
                  'research_theme', 'novelty', 'memo', 'tech_tags']
        extra_kwargs = {
            'research_theme': {'allow_blank': True},
            'novelty': {'allow_blank': True},
            'memo': {'allow_blank': True}
        }
