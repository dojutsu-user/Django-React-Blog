from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .serializers import AdminPostDetailSerializer, AdminPostListSerializer
from post.models import Post


class AdminPostListView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_on')
    serializer_class = AdminPostListSerializer
    permission_classes = (IsAdminUser,)
    lookup_field = 'slug'
    authentication_classes = (JSONWebTokenAuthentication,)


class AdminPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = AdminPostDetailSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)
    lookup_field = 'slug'
