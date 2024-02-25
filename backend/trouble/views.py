from django.shortcuts import render, redirect
from trouble.forms import CommentForm
from .models import Trouble


def troublepage(request):
    troubles = Trouble.objects.all()
    return render(request, "trouble/troublepage.html", {"troubles": troubles})


def trouble_detail(request, slug):
    trouble = Trouble.objects.get(slug=slug)

    if request.method == "POST":
        form = CommentForm(request.POST)

        if form.is_valid():
            comment = form.save(commit=False)
            comment.trouble = trouble
            comment.save()

            return redirect("trouble_detail", slug=trouble.slug)

    else:
        form = CommentForm()

    return render(request, "trouble/trouble_detail.html", {"trouble": trouble, "form": form})
