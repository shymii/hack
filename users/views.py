from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UserChangeForm
from django.contrib.auth import login, logout

from django.contrib.auth.decorators import login_required
from .decorators import unauthenticated_user, is_admin, is_not_session

from .forms import CreateUserForm, LoginUserForm, ModifyUserForm, ModifyUserDataForm, SurveyForm
from .models import user_profile, user_survey

from datetime import date

from django.http import JsonResponse

# Create your views here.
@is_admin
def create_json(request):
    surveys = user_survey.objects.filter(user = request.user.user_profile).order_by('survey_date')
    survey_results = {
        'weight' : [],
        'height' : [],
        'chest' : [],
        'bicep' : [],
        'thigh' : [],
        'waist' : [],
        'hips' : [],
        'arms' : [],
        'stress' : [],
        'date': []
    }
    for result in surveys:
        survey_results['weight'].append(float(result.weight))
        survey_results['height'].append(int(result.height))
        survey_results['chest'].append(float(result.chest))
        survey_results['bicep'].append(float(result.bicep))
        survey_results['thigh'].append(float(result.thigh))
        survey_results['waist'].append(float(result.waist))
        survey_results['hips'].append(float(result.hips))
        survey_results['arms'].append(float(result.arms))
        survey_results['stress'].append(str(result.stress))
        survey_results['date'].append(str(result.survey_date))
    return JsonResponse({'survey_results' : survey_results})

@unauthenticated_user
@is_not_session
def register_view(request):
    form = CreateUserForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            messages.success(request, 'Pomyślnie utworzono użytkownika')
            return redirect('login')
        else:
            messages.error(request, 'Błąd, uzupełnij ponownie formularz')
    else:
        form = CreateUserForm()
    template = 'users/register.html'
    context = {'form' : form}
    return render(request, template, context)

@unauthenticated_user
@is_not_session
def login_view(request):
    if request.method == 'POST':
        form = LoginUserForm(data = request.POST)
        if form.is_valid():
            user = form.get_user()
            request.session.setdefault('browse_mode', 'dark')
            # request.session['browse_mode'] = 'dark'
            login(request, user)
            messages.success(request, 'Zalogowano jako %s' % user)
            return redirect('homepage')
        else:
            messages.error(request, 'Błąd, uzupełnij ponownie formularz')
    else:
        form = LoginUserForm()
    template = 'users/login.html'
    context = {'form': form}
    return render(request, template, context)

@login_required(login_url = 'login')
def logout_view(request):
    logout(request)
    messages.success(request, 'Wylogowano')
    return redirect('homepage')

@login_required(login_url = 'login')
@is_not_session
def account_view(request):
    surveys = user_survey.objects.filter(user = request.user.user_profile).order_by('-survey_date')
    survey_result = create_json(request)
    context = {'surveys': surveys}
    template = 'users/account.html'
    return render(request, template, context)

@login_required(login_url = 'login')
@is_not_session
def account_edit(request):
    if request.method == 'POST':
        u_form = ModifyUserForm(request.POST, instance = request.user)
        p_form = ModifyUserDataForm(request.POST, request.FILES, instance = request.user.user_profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, 'Pomyślnie edytowano profil')
            return redirect('account')
        else:
            messages.error(request, 'Błąd, uzupełnij ponownie formularz')
    else:
        u_form = ModifyUserForm(instance = request.user)
        p_form = ModifyUserDataForm(instance = request.user.user_profile)
        template = 'users/account_edit.html'
        context = {'u_form': u_form, 'p_form': p_form, 'form_user': request.user.user_profile}
        return render(request, template, context)

@login_required(login_url = 'login')
@is_not_session
def account_survey(request):
    this_user = request.user.user_profile
    today = date.today()
    surveys = user_survey.objects.filter(user = this_user, survey_date = today)
    if not surveys:
        if request.method == 'POST':
            form = SurveyForm(request.POST)
            if form.is_valid():
                instance = form.save(commit = False)
                instance.user = request.user.user_profile
                instance.save()
                messages.success(request, 'Pomyślnie dodano ankietę')
                return redirect('account')
            else:
                messages.error(request, 'Błąd, uzupełnij ponownie formularz')
        else:
            form = SurveyForm()
        template = 'users/survey.html'
        context = {'form': form}
        return render(request, template, context)
    else: 
        messages.warning(request, 'Dzisiejsza ankieta została już wypełniona, spróbuj ponownie jutro')
        return redirect('account')

def browse_mode(request, url):
    if request.session['browse_mode'] == 'dark':
        request.session['browse_mode'] = 'light'
    else:
        request.session['browse_mode'] = 'dark'
    return redirect(url)
