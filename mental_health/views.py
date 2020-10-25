from django.shortcuts import render
from .decorators import is_not_session

# Create your views here.
@is_not_session
def mental_health_view(request):
    template = 'mental_health/mental_health.html'
    context = {}
    return render(request, template, context)