from rest_framework import routers
from .views import UserViewSet, ThemeViewSet, NoveltyViewSet


router = routers.DefaultRouter()
router.register("users", UserViewSet)
router.register("themes", ThemeViewSet)
router.register("novelties", NoveltyViewSet)

urlpatterns = []

urlpatterns += router.urls
