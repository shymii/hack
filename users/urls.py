from django.urls import path
from . import views

urlpatterns = [
    path('account/', views.account_view, name="account"),
    path('account/edit/', views.account_edit, name="account_edit"),
    path('account/survey/', views.account_survey, name="acccount_survey"),
    path('register/', views.register_view, name="register"),
    path('login/', views.login_view, name="login"),
    path('logout/', views.logout_view, name="logout"),
]
