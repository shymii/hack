from django.urls import path
from . import views

urlpatterns = [
    path('covid/', views.covid_view, name="covid"),
]
