from django.contrib.auth import get_user_model

from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response
from rest_framework import status

from user_profile.models import UserProfile
from .serializers import AdminUserDetailSerializer, AdminUserListSerializer

User = get_user_model()


class AdminUserListView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = AdminUserListSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserDetailSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAdminUser,)

    def destroy(self, request, *args, **kwargs):
        instance = User.objects.get(pk=request.data.get('pk'))
        admin_user = User.objects.get(pk=1)
        if instance == admin_user:
            return Response({'detail': "Can't Delete Admin Of The Website"}, status=status.HTTP_400_BAD_REQUEST)
        if not instance:
            return Response({'detail': 'User Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        instance.delete()
        return Response(status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = User.objects.get(pk=request.query_params.get('pk'))
        if not instance:
            return Response({'detail': 'User Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = User.objects.get(pk=request.data.get('pk'))
        if not instance:
            return Response({'detail': 'User Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = AdminUserDetailSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)
