from django.urls import path
from . import views

urlpatterns = [
    path('covid/', views.covid_view, name="covid"),
    path('covid/global/', views.global_covid_view, name="globalcovid"),
    path('covid/compare/', views.compare_covid_view, name="comparecovid"),
    path('covid/country/', views.country_covid_view, name="countrycovid")
]
