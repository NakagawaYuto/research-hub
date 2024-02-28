from rest_framework import viewsets
from .models import User, TechTag, Theme, Novelty, Memo
from .serializer import UserSerializer, TechTagSerializer, ThemeSerializer, NoveltySerializer, MemoSerializer



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TechTagViewSet(viewsets.ModelViewSet):
    queryset = TechTag.objects.all()
    serializer_class = TechTagSerializer


class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer


class NoveltyViewSet(viewsets.ModelViewSet):
    queryset = Novelty.objects.all()
    serializer_class = NoveltySerializer


class MemoViewSet(viewsets.ModelViewSet):
    queryset = Memo.objects.all()
    serializer_class = MemoSerializer
