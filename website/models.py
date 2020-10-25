from django.db import models
# Create your models here.

class fact(models.Model):
    title = models.CharField(max_length = 50)
    text = models.TextField()

    class Meta:
        verbose_name_plural = 'Ciekawostki'