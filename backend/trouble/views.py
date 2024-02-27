from django.shortcuts import render
from .models import Trouble


def troublepage(request):
    troubles = Trouble.objects.all()
    return render(request, "trouble/troublepage.html", {"troubles": troubles})
