from django.contrib.auth import get_user_model

from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from user_profile.models import UserProfile
from .serializers import AdminUserProfileSerializer, AdminUserListSerializer

User = get_user_model()


class AdminUserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserListSerializer
    permission_classes = [IsAdminUser, ]


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = AdminUserProfileSerializer
    permission_classes = [IsAdminUser,]