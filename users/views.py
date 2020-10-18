from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout

from .forms import CreateUserForm, LoginUserForm

# Create your views here.
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
    
def login_view(request):
    if request.user.is_authenticated:
        return redirect('homepage')
    else:
        if request.method == 'POST':
            form = LoginUserForm(data = request.POST)
            if form.is_valid():
                user = form.get_user()
                login(request, user)
                return redirect('homepage')
        else:
            form = LoginUserForm()

        context = {'form': form}
        template = 'users/login.html'
        return render(request, template, context)

def logout_view(request):
    logout(request)
    return redirect('homepage')

def account_view(request):
    if request.user.is_authenticated:
        template = 'users/account.html'
        return render(request, template)
    else:
        return redirect('homepage')