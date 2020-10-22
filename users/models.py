from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_save

import os
from .storage import OverwriteStorage
from PIL import Image

# Create your models here.
GENDER_CHOICES = [
    ('nieokreślona', 'nieokreślona'),
    ('mężczyzna', 'mężczyzna'),
    ('kobieta', 'kobieta')
]

def get_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = '{}.{}'.format(instance.user.username, ext)
    return os.path.join('profile_image', filename)

class user_profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, blank = True, editable = False, primary_key = True)
    sex = models.CharField(null = True, blank = True, max_length = 15, choices = GENDER_CHOICES)
    city = models.CharField(max_length = 40, blank = True, null = True)
    birth_date = models.DateField(null = True, blank = True)
    image = models.ImageField(upload_to = get_upload_path, default = 'profile_image/default.png', storage = OverwriteStorage())

    def my_property(self):
        return self.user.first_name + ' ' + self.user.last_name
    
    full_name = property(my_property)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = 'Dodatkowe informacje o użytkownikach'

    def save(self, *args, **kwargs):
        super(user_profile, self).save(*args, **kwargs)
        imag = Image.open(self.image.path)
        if imag.width > 512 or imag.height > 512:
            output_size = (512, 512)
            imag.thumbnail(output_size)
            imag.save(self.image.path)

class user_survey(models.Model):
    user = models.ForeignKey(user_profile, on_delete = models.CASCADE, editable = False)
    weight = models.DecimalField(max_digits = 5, decimal_places = 2)
    height = models.DecimalField(max_digits = 3, decimal_places = 0)
    chest = models.DecimalField(max_digits = 5, decimal_places = 2)
    bicep = models.DecimalField(max_digits = 4, decimal_places = 2)
    thigh = models.DecimalField(max_digits = 5, decimal_places = 2)
    waist = models.DecimalField(max_digits = 4, decimal_places = 2)
    hips = models.DecimalField(max_digits = 5, decimal_places = 2)
    arms = models.DecimalField(max_digits = 5, decimal_places = 2)
    stress = models.CharField(max_length = 20)
    survey_date = models.DateField(auto_now_add = True)

    def my_property(self):
        return self.user.user.first_name + ' ' + self.user.user.last_name
    
    full_name = property(my_property)

    def __str__(self):
        return self.user.user.username

    class Meta:
        verbose_name_plural = 'Ankiety'




