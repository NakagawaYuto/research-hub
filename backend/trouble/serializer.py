from rest_framework import serializers
from .models import Trouble, Comment


class TroubleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trouble
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
