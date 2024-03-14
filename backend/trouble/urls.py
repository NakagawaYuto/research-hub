from rest_framework import routers
from .views import TroubleViewSet, CommentViewSet


router = routers.DefaultRouter()
router.register(r'trouble', TroubleViewSet)
router.register(r'comment', CommentViewSet)

urlpatterns = [
]

urlpatterns += router.urls
