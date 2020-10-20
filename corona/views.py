from django.shortcuts import render

# Create your views here.
def covid_view(request):
    template = 'covid/covid.html'
    context = {}
    return render(request, template, context)

def global_covid_view(request):
    template = 'covid/globalcovid.html'
    context = {}
    return render(request, template, context)

def compare_covid_view(request):
    template = 'covid/comparecovid.html'
    context = {}
    return render(request, template, context)

def country_covid_view(request):
    template = 'covid/countrycovid.html'
    context = {}
    return render(request, template, context)