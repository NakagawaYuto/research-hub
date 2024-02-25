from rest_framework import viewsets
from .models import User, Theme, Novelty
from .serializer import UserSerializer, ThemeSerializer, NoveltySerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer


class NoveltyViewSet(viewsets.ModelViewSet):
    queryset = Novelty.objects.all()
    serializer_class = NoveltySerializer
