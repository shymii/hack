from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import user_profile

@receiver(post_save, sender = User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        user_profile.objects.create(
            user = instance,
            username = instance.username,
            first_name = instance.first_name,
            last_name = instance.last_name,
            email = instance.email,
            )
        #print('Profile created!')

@receiver(post_save, sender = User)
def update_profile(sender, instance, created, **kwargs):
    if created == False:
        try:
            instance.user_profile.save()
        except:
            user_profile.objects.create(
                user = instance,
                username = instance.username,
                first_name = instance.first_name,
                last_name = instance.last_name,
                email = instance.email,
            )