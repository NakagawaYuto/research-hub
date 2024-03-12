from rest_framework import viewsets
from .models import Trouble, Comment
from .serializer import TroubleSerializer, CommentSerializer


class TroubleViewSet(viewsets.ModelViewSet):
    queryset = Trouble.objects.all()
    serializer_class = TroubleSerializer

    def get_queryset(self):
        """
        このビューが返すクエリセットをカスタマイズします。
        'name'パラメータに基づいてフィルタリングを行います。
        """
        queryset = super().get_queryset()
        item_name = self.request.query_params.get('user')
        if item_name is not None:
            queryset = queryset.filter(user=item_name)
        return queryset


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

