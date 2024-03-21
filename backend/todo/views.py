
from rest_framework import viewsets
from .models import Todo, Detail
from .serializer import TodoSerializer, DetailSerializer

# Create your views here.


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        """
        このビューが返すクエリセットをカスタマイズします。
        'user'パラメータに基づいてフィルタリングを行います。
        """
        queryset = super().get_queryset()
        user_id = self.request.query_params.get('user')
        if user_id is not None:
            queryset = queryset.filter(user=user_id)
        return queryset


class DetailViewSet(viewsets.ModelViewSet):
    queryset = Detail.objects.all()
    serializer_class = DetailSerializer

    def get_queryset(self):
        """
        このビューが返すクエリセットをカスタマイズします。
        'department'パラメータに基づいてフィルタリングを行います。
        """
        queryset = super().get_queryset()
        todo_id = self.request.query_params.get('department')
        if todo_id is not None:
            queryset = queryset.filter(department=todo_id)
        return queryset
