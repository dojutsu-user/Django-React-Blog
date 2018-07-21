from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication

from .serializers import AdminPostDetailSerializer
from api.post.serializers import PostListSerializer
from post.models import Post


class AdminPostListView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = [IsAdminUser, ]
    lookup_field = 'slug'
    authentication_classes = [TokenAuthentication]


class AdminPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = AdminPostDetailSerializer
    permission_classes = [IsAdminUser, ]
    authentication_classes = (TokenAuthentication,)
    lookup_field = 'slug'
