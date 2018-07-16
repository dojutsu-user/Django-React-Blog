from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


class UserProfile(models.Model):
    """Model For Extending Default Django User Model"""

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='user')
    website = models.URLField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True, max_length=100)
    country = models.CharField(max_length=20, null=True, blank=True)
    facebook_url = models.URLField(null=True, blank=True)
    twitter_handler = models.CharField(max_length=40, null=True, blank=True)

    def __str__(self):
        try:
            return f'{self.user.first_name} + {self.user.last_name}'
        except:
            return "Name Not Set For The User"


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, *args, **kwargs):
    """Automatically Create A User Profile When A New User IS Registered"""

    if created:
        user_profile = UserProfile(user=instance)
        user_profile.save()
