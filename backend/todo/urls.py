from rest_framework import routers
from .views import TodoViewSet, DetailViewSet


router = routers.DefaultRouter()
router.register(r'todo', TodoViewSet)
router.register(r'detail', DetailViewSet)


urlpatterns = [
]

urlpatterns += router.urls
