from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UserChangeForm
from django.contrib.auth import login, logout

from django.contrib.auth.decorators import login_required
from .decorators import unauthenticated_user

from .forms import CreateUserForm, LoginUserForm, ModifyUserForm, ModifyUserDataForm, SurveyForm

# Create your views here.
@unauthenticated_user
def register_view(request):
    form = CreateUserForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = CreateUserForm()
    template = 'users/register.html'
    context = {'form' : form}
    return render(request, template, context)

@unauthenticated_user
def login_view(request):
    if request.method == 'POST':
        form = LoginUserForm(data = request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('homepage')
    else:
        form = LoginUserForm()
    template = 'users/login.html'
    context = {'form': form}
    return render(request, template, context)

@login_required(login_url = 'login')
def logout_view(request):
    logout(request)
    return redirect('homepage')

@login_required(login_url = 'login')
def account_view(request):
    template = 'users/account.html'
    return render(request, template)

@login_required(login_url = 'login')
def account_edit(request):
    if request.method == 'POST':
        u_form = ModifyUserForm(request.POST, instance = request.user)
        p_form = ModifyUserDataForm(request.POST, instance = request.user.user_profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            return redirect('account')
    else:
        u_form = ModifyUserForm(instance = request.user)
        p_form = ModifyUserDataForm(instance = request.user.user_profile)
        template = 'users/account_edit.html'
        context = {'u_form': u_form, 'p_form': p_form}
        return render(request, template, context)

@login_required(login_url = 'login')
def account_survey(request):
    if request.method == 'POST':
      form = SurveyForm(request.POST)
      if form.is_valid():
          instance = form.save(commit = False)
          instance.user = request.user.user_profile
          instance.save()
          return redirect('account')
    else:
        form = SurveyForm()
    template = 'users/survey.html'
    context = {'form': form}
    return render(request, template, context)
