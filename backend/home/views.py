from rest_framework import viewsets
from .models import TechTag, User
from .serializer import TechTagSerializer, UserSerializer


class TechTagViewSet(viewsets.ModelViewSet):
    queryset = TechTag.objects.all()
    serializer_class = TechTagSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
