from rest_framework import serializers

from post.models import Post
from api.comment.serializers import CommentSerializer


class PostSerializer(serializers.ModelSerializer):
    """DRF Serializer for the Post Model"""

    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'
