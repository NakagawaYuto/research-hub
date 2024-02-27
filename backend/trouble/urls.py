from rest_framework import routers
from .views import troublepage


router = routers.DefaultRouter()
router.register(r'trouble', troublepage)

urlpatterns = [
]

urlpatterns += router.urls
