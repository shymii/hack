from django.shortcuts import render
from users.models import user_survey
import datetime

from .decorators import is_not_session

# Create your views here.
@is_not_session
def physical_health_view(request):
    try:
        survey_result = user_survey.objects.filter(user = request.user.user_profile).order_by('-survey_date')[0]
        year = request.user.user_profile.birth_date.year
        now = datetime.datetime.now()
        year_now = now.year
        birth_date = year_now - year
        gender = request.user.user_profile.sex
        context = {'survey_result' : survey_result, 'birth_date' : birth_date, 'gender' : gender}
    except:
        context = {}   
    template = 'physical_health/physical_health.html'
    return render(request, template, context)