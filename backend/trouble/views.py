from rest_framework import viewsets
from .models import Trouble, Comment
from .serializer import TroubleSerializer, CommentSerializer


class TroubleViewSet(viewsets.ModelViewSet):
    queryset = Trouble.objects.all()
    serializer_class = TroubleSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
