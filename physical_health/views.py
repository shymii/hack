from django.shortcuts import render
from users.models import user_survey
import datetime

# Create your views here.
def physical_health_view(request):
    if request.user.is_authenticated:
        survey_result = user_survey.objects.filter(user = request.user.user_profile).order_by('-survey_date')[0]
        if survey_result == None:
            context = {}
        else:
            year = request.user.user_profile.birth_date.year
            now = datetime.datetime.now()
            year_now = now.year
            birth_date = year_now - year
            gender = request.user.user_profile.sex
            context = {'survey_result' : survey_result, 'birth_date' : birth_date, 'gender' : gender}
    else:
        context = {}
    template = 'physical_health/physical_health.html'
    return render(request, template, context)