from rest_framework import generics 

from .serializers import PostSerializer
from post.models import Post

class PostListView(generics.ListAPIView):
    """View For List All Published Posts"""

    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostSerializer
    lookup_field = 'slug'


class PostDetailView(generics.RetrieveAPIView):
    """View For The Details Of A Single Post"""

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'