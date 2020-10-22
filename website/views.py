from django.shortcuts import render

# Create your views here.
def homepage(request):
    if 'browse_mode' not in request.session:
        request.session['browse_mode'] = 'dark'
    template = 'homepage/homepage.html'
    return render(request, template)
