from rest_framework import serializers

from post.models import Post
from api.comment.serializers import CommentSerializer


class PostListSerializer(serializers.ModelSerializer):
    """DRF Serializer Listing All The Blog Posts"""

    total_comments = serializers.IntegerField()
    author_full_name = serializers.CharField()

    class Meta:
        model = Post
        fields = ['slug', 'title', 'short_description',
                  'total_comments', 'author_full_name', 'published_on']


class PostDetailSerializer(serializers.ModelSerializer):
    """DRF Serializer For Details Of The Blog Posts"""

    comments_list = CommentSerializer(many=True)
    total_comments = serializers.IntegerField()
    author_full_name = serializers.CharField()

    class Meta:
        model = Post
        fields = ['slug', 'title', 'body', 'author_full_name',
                  'published_on', 'comments_list', 'short_description', 'total_comments']
