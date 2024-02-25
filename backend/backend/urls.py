from django.contrib import admin
from django.urls import path
from trouble.views import troublepage, trouble_detail


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", troublepage),
    path("<slug:slug>/", trouble_detail, name="trouble_detail")
    # path('trouble/',include('trouble.urls'))
]
