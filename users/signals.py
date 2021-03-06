from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import user_profile

@receiver(post_save, sender = User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        user_profile.objects.create(user = instance)

@receiver(post_save, sender = User)
def update_profile(sender, instance, created, **kwargs):
    if not created:
        try:
            instance.user_profile.save()
        except:
            user_profile.objects.create(user = instance)