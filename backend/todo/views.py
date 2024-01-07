
from rest_framework import viewsets
from .models import Todo, Detail
from .serializer import TodoSerializer, DetailSerializer

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class DetailViewSet(viewsets.ModelViewSet):
    queryset = Detail.objects.all()
    serializer_class = DetailSerializer
    

