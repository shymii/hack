from django.shortcuts import render

# Create your views here.
def mental_health_view(request):
    template = 'mental_health/mental_health.html'
    context = {}
    return render(request, template, context)