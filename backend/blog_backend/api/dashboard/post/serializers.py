from rest_framework import serializers

from post.models import Post

class PostCreateSerializer(serializers.ModelSerializer):
    """Serializer For Creating A Post For Logged In Users"""

    class Meta:
        model = Post
        fields = ('title', 'body', 'short_description', 'author')
