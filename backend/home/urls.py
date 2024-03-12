from rest_framework import routers
from .views import TechTagViewSet, UserViewSet

router = routers.DefaultRouter()
router.register("techtags", TechTagViewSet)
router.register("users", UserViewSet)

urlpatterns = []

urlpatterns += router.urls
