from django.contrib import admin
from .models import User, TechTag, Theme, Novelty, Memo

admin.site.register(User)
admin.site.register(TechTag)
admin.site.register(Theme)
admin.site.register(Novelty)
admin.site.register(Memo)
