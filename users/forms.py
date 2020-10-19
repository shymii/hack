from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UserChangeForm
from django.contrib.auth.models import User
from django import forms
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox
from .models import user_profile

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

class ModifyUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

class ModifyUserDataForm(forms.ModelForm):
    birth_date = forms.DateField(required = False)
    sex = forms.BooleanField(required = False)

    class Meta:
        model = user_profile
        fields = ['birth_date', 'sex']

    def save(self, commit = True):
        user = super(ModifyUserDataForm, self).save(commit = False)
        user.birth_date = self.cleaned_data['birth_date']
        user.sex = self.cleaned_data['sex']
        if commit:
            user.save()
        return user
