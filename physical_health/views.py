from django.shortcuts import render

# Create your views here.
def physical_health_view(request):
    template = 'physical_health/physical_health.html'
    context = {}
    return render(request, template, context)