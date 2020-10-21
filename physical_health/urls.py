from django.urls import path
from . import views

urlpatterns = [
    path('physical-health/', views.physical_health_view, name="physical_health_view"),
]