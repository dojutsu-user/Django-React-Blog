from django.contrib.auth import get_user_model

from rest_framework import serializers

from user_profile.models import UserProfile

User = get_user_model()


class AdminUserListSerializer(serializers.ModelSerializer):
    """Serializer To Show List Of Users In The Admin Panel"""

    class Meta:
        model = User
        fields = ['id', 'password', 'username',
                  'email', 'first_name', 'last_name', 'is_active']

    def create(self, validated_data):
        raw_password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(raw_password)
        user.save()
        return user


class AdminUserDetailSerializer(serializers.ModelSerializer):
    """Serializer To Show The Full Detail Of A User With Its Profile"""

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
        fields = ['id', 'password', 'username', 'email', 'first_name', 'last_name',
                  'website', 'bio', 'country', 'facebook_url', 'twitter_handler',
                  'is_active', 'is_staff', 'is_superuser']

    def update(self, instance, validated_data):
        """Overwriting The Default update Method For This Serializer
        To Update User And UserProfile At A Single Endpoint"""

        profile_data = validated_data.pop('profile', None)
        self.update_or_create_profile(instance, profile_data)
        return super(AdminUserDetailSerializer, self).update(instance, validated_data)

    def update_or_create_profile(self, user, profile_data):
        """This always creates a Profile if the User is missing one"""

        UserProfile.objects.update_or_create(user=user, defaults=profile_data)
