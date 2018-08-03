from rest_framework import serializers

from post.models import Post


class PostCreateSerializer(serializers.ModelSerializer):
    """Serializer For Creating A Post For Logged In Users"""

    class Meta:
        model = Post
        fields = ('title', 'body', 'short_description', 'author')


class PostListSerializer(serializers.ModelSerializer):
    """Serializer For Listing Only Relevant Information
    Of Posts Of A Particular User"""

    total_comments = serializers.IntegerField()

    class Meta:
        model = Post
        fields = ('title', 'is_published', 'slug',
                  'total_comments', 'created_on')

class PostUpdateSerializer(serializers.ModelSerializer):
    """Serializer For Creating A Post For Logged In Users"""

    class Meta:
        model = Post
        fields = ('title', 'body', 'short_description')
