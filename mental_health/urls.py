from django.urls import path
from . import views

urlpatterns = [
    path('mental-health/', views.mental_health_view, name="mental_health_view"),
]