from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('account/', views.account_view, name="account"),
    path('account/edit/', views.account_edit, name="account_edit"),
    path('account/survey/', views.account_survey, name="account_survey"),
    path('register/', views.register_view, name="register"),
    path('login/', views.login_view, name="login"),
    path('logout/', views.logout_view, name="logout"),
    path('sendjson/', views.create_json, name="create_json"),
    path('browse-mode/<str:url>', views.browse_mode, name="browse_mode")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

