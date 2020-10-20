# Generated by Django 3.1.2 on 2020-10-18 21:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20201018_2316'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_profile',
            name='height',
        ),
        migrations.RemoveField(
            model_name='user_profile',
            name='weight',
        ),
        migrations.AddField(
            model_name='user_profile',
            name='birth_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='user_survey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.DecimalField(decimal_places=2, max_digits=5)),
                ('height', models.DecimalField(decimal_places=0, max_digits=3)),
                ('chest', models.DecimalField(decimal_places=2, max_digits=5)),
                ('bicep', models.DecimalField(decimal_places=2, max_digits=4)),
                ('thigh', models.DecimalField(decimal_places=2, max_digits=5)),
                ('waist', models.DecimalField(decimal_places=2, max_digits=4)),
                ('hips', models.DecimalField(decimal_places=2, max_digits=5)),
                ('arms', models.DecimalField(decimal_places=2, max_digits=5)),
                ('stress', models.CharField(max_length=20)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user_profile')),
            ],
        ),
    ]