from django.shortcuts import render

# Create your views here.
def covid_view(request):
    template = 'covid/covid.html'
    context = {}
    return render(request, template, context)