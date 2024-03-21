from django.contrib import admin
from django.urls import path, include
from dotenv import load_dotenv
import os

# .envファイルの内容を読み込見込む
load_dotenv()


urlpatterns = [
    path(os.environ['ADMIN_URL'], admin.site.urls),
    path('', include("home.urls")),
    path('todo/', include("todo.urls")),
    path('trouble/', include("trouble.urls")),
    path('auth/', include('djoser.urls.jwt')),
]
