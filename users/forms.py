from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox

class CreateUserForm(UserCreationForm):
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox(api_params={'hl': 'pl'}, attrs={'data-theme': 'dark'}))
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].label = 'Imię'
        self.fields['last_name'].label = 'Nazwisko'
        self.fields['username'].label = 'Nazwa użytkownika'
        self.fields['email'].label = 'Adres e-mail'
        self.fields['password1'].label = 'Hasło'
        self.fields['password2'].label = 'Potwierdź hasło'
        self.error_messages['password_mismatch'] = 'Hasła muszą być takie same!'
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2', 'captcha']

class LoginUserForm(AuthenticationForm):
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox(api_params={'hl': 'pl'}, attrs={'data-theme': 'dark'}))