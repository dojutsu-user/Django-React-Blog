from django.contrib.auth import get_user_model

from rest_framework import serializers

from post.models import Post

User = get_user_model()


class AdminPostDetailSerializer(serializers.ModelSerializer):
    """Serializer To List Details Of A Post In The For Admin Panel"""

    class Meta:
        model = Post
        fields = '__all__'


class AdminPostListSerializer(serializers.ModelSerializer):
    """Serializer To List All Posts In The Database For Admin Panel"""

    class Meta:
        model = Post
        fields = ['title', 'author_full_name',
                  'slug', 'is_published', 'total_comments']
