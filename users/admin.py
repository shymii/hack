from django.contrib import admin
from .models import user_profile, user_survey
from django.contrib.auth.models import User

# Register your models here.

class user_survey_inline(admin.TabularInline):
    model = user_survey
    extra = 0
    readonly_fields = ['weight', 'height', 'chest', 'bicep', 'thigh', 'waist', 'hips', 'arms', 'stress']
    date_hierarchy = 'survey_date'

class user_profile_admin(admin.ModelAdmin):
    list_display = ['full_name', 'sex', 'birth_date']
    inlines = [user_survey_inline]

class user_survey_admin(admin.ModelAdmin):
    search_fields = ['full_name', 'survey_date']
    list_display = ['full_name']
    readonly_fields = ['survey_date', 'user']

    fieldsets = [
        ('Informacje o użytkowniku', {'fields': ['user']}),
        ('Rezultat ankiety', {'fields': ['weight', 'height', 'chest', 'bicep', 'thigh', 'waist', 'hips', 'arms', 'stress']}),
        ('Data przesłania ankiety', {'fields': ['survey_date']})
    ]

admin.site.register(user_profile, user_profile_admin)
admin.site.register(user_survey, user_survey_admin)
