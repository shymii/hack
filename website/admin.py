from django.contrib import admin
from .models import fact

# Register your models here.

class fact_admin(admin.ModelAdmin):
    model = fact
    search_fields = ['title', 'text']
    list_display = ['title', 'text']

    fieldsets = [
        ('Ciekawostka', {'fields': ['title', 'text']}),
    ]

admin.site.register(fact, fact_admin)
