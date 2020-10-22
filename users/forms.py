from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UserChangeForm
from django.contrib.auth.models import User
from django import forms
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox
from .models import user_profile, user_survey

class CreateUserForm(UserCreationForm):
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox(api_params={'hl': 'pl'}, attrs={'data-theme': 'dark'}))
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'password1', 'password2', 'captcha']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].label = 'Imię'
        self.fields['last_name'].label = 'Nazwisko'
        self.fields['username'].label = 'Nazwa użytkownika'
        self.fields['email'].label = 'Adres e-mail'
        self.fields['password1'].label = 'Hasło'
        self.fields['password2'].label = 'Potwierdź hasło'
        self.error_messages['password_mismatch'] = 'Hasła muszą być takie same!'

class LoginUserForm(AuthenticationForm):
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox(api_params={'hl': 'pl'}, attrs={'data-theme': 'dark'}))
    class Meta:
        model = User
        fields = ['username', 'password', 'captcha']

class ModifyUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].widget = forms.TextInput(attrs={'placeholder': ' '})
        self.fields['last_name'].widget = forms.TextInput(attrs={'placeholder': ' '})
        self.fields['email'].widget = forms.TextInput(attrs={'placeholder': ' '})

GENDER_CHOICES = [
    ('nieznana', 'nieznana'),
    ('mężczyzna', 'mężczyzna'),
    ('kobieta', 'kobieta')
]

class ModifyUserDataForm(forms.ModelForm):
    sex = forms.ChoiceField(widget = forms.Select, choices = GENDER_CHOICES)
    class Meta:
        model = user_profile
        fields = ['birth_date', 'sex', 'city', 'image']
        widgets = {
            'birth_date': forms.DateInput(format = ('%Y-%m-%d'), attrs = {'type': 'date'})
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['birth_date'].label = 'Data urodzenia'
        self.fields['sex'].label = 'Płeć'
        self.fields['city'].label = 'Miasto'
        self.fields['city'].widget = forms.TextInput(attrs={'placeholder': ' '})

STRESS_CHOICES = [
    ('niski', 'niski'),
    ('zrównoważony', 'zrównoważony'),
    ('wysoki', 'wysoki')
]

class SurveyForm(forms.ModelForm):
    stress = forms.ChoiceField(widget = forms.RadioSelect, choices = STRESS_CHOICES)
    class Meta:
        model = user_survey
        fields = ['weight', 'height', 'chest', 'bicep', 'thigh', 'waist', 'hips', 'arms', 'stress']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['weight'].label = 'Waga'
        self.fields['height'].label = 'Wzrost'
        self.fields['chest'].label = 'Klatka piersiowa'
        self.fields['bicep'].label = 'Biceps'
        self.fields['thigh'].label = 'Uda'
        self.fields['waist'].label = 'Talia'
        self.fields['hips'].label = 'Biodra'
        self.fields['arms'].label = 'Barki'
        self.fields['stress'].label = 'Poziom stresu'

