from rest_framework import generics 

from .serializers import PostListSerializer, PostDetailSerializer
from post.models import Post

class PostListView(generics.ListAPIView):
    """View For List All Published Posts"""

    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostListSerializer
    lookup_field = 'slug'


class PostDetailView(generics.RetrieveAPIView):
    """View For The Details Of A Single Post"""

    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'