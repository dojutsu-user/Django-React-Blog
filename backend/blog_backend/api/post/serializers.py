from rest_framework import serializers

from post.models import Post
from api.comment.serializers import CommentSerializer


class PostListSerializer(serializers.ModelSerializer):
    """DRF Serializer Listing All The Blog Posts"""

    total_comments = serializers.IntegerField()

    class Meta:
        model = Post
        fields = '__all__'



class PostDetailSerializer(serializers.ModelSerializer):
    """DRF Serializer For Details Of The Blog Posts"""

    comments_list = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'
