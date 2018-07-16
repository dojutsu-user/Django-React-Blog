from django.contrib.auth import get_user_model

from rest_framework import serializers

from user_profile.models import UserProfile

User = get_user_model()


class AdminUserListSerializer(serializers.ModelSerializer):
    """Serializer To Show List Of Users In The Admin Panel"""

    class Meta:
        model = User
        fields = ['id', 'password', 'username',
                  'email', 'first_name', 'last_name']

    def create(self, validated_data):
        raw_password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(raw_password)
        user.save()
        return user


class AdminUserDetailSerializer(serializers.ModelSerializer):
    """Serializer To Show The Full Detail Of A User Of Default Django User Model"""

    class Meta:
        model = User
        fields = '__all__'


class AdminUserProfileSerializer(serializers.ModelSerializer):
    """Serializer To Show The Full Custom User Profile Model"""

    user = AdminUserDetailSerializer()

    class Meta:
        model = UserProfile
        fields = ['id', 'website', 'bio', 'country',
                  'facebook_url', 'twitter_handler', 'user']

    depth = 1

    def update(self, validated_data):
        user_detail = validated_data.pop('user')
        user = User.objects.update_or_create(**user)
        user.save()
        user_profile = UserProfile.update_or_create(**validated_data)
        user_profile.save()
        return user_profile
