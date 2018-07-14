from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.ModelSerializer):
    """DRF Serializer for the Post Model"""

    class Meta:
        model = Post
        fields = '__all__'