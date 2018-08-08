from django.contrib.auth import get_user_model

from rest_framework import serializers

from user_profile.models import UserProfile

User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer To Show User Profile In User Dashboard"""

    website = serializers.URLField(
        source='profile.website', allow_blank=True, allow_null=True)
    bio = serializers.CharField(
        source='profile.bio', allow_blank=True, allow_null=True)
    country = serializers.CharField(
        source='profile.country', allow_blank=True, allow_null=True)
    facebook_url = serializers.URLField(
        source='profile.facebook_url', allow_blank=True, allow_null=True)
    twitter_handler = serializers.CharField(
        source='profile.twitter_handler', allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name',
                  'website', 'bio', 'country', 'facebook_url', 'twitter_handler']

    def update(self, instance, validated_data):
        """Overwriting The Default update Method For This Serializer
        To Update User And UserProfile At A Single Endpoint"""

        profile_data = validated_data.pop('profile', None)
        self.update_or_create_profile(instance, profile_data)
        return super(UserProfileSerializer, self).update(instance, validated_data)

    def update_or_create_profile(self, user, profile_data):
        """This always creates a Profile if the User is missing one"""

        UserProfile.objects.update_or_create(user=user, defaults=profile_data)


class UserStatus(serializers.ModelSerializer):
    """DRF Serializer To Get The Status Of The User (Active/Superuser)"""

    class Meta:
        model = User
        fields = ['is_active', 'is_superuser']
