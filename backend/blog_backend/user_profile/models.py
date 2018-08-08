from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


class UserProfile(models.Model):
    """Model For Extending Default Django User Model"""

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    website = models.URLField(blank=True, default="")
    bio = models.TextField(blank=True, max_length=100, default="")
    country = models.CharField(max_length=20, blank=True, default="")
    facebook_url = models.URLField(blank=True, default="")
    twitter_handler = models.CharField(max_length=40, blank=True, default="")

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @property
    def full_name(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @property
    def username(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, *args, **kwargs):
    """Automatically Create A User Profile When A New User IS Registered"""

    if created:
        user_profile = UserProfile(user=instance)
        user_profile.save()
