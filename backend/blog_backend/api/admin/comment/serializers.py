from rest_framework import serializers

from comment.models import Comment


class CommentListSerializer(serializers.ModelSerializer):
    """DRF Serializer For Listing Comments"""

    post_title = serializers.CharField(source='post.title')

    class Meta:
        model = Comment
        fields = ['id', 'name', 'email', 'post_title',
                  'is_displayed', 'published_on']


class CommentDetailSerializer(serializers.ModelSerializer):
    """DRF Serializer For The Detail Of A Comment"""

    post_title = serializers.CharField(source='post.title')

    class Meta:
        model = Comment
        fields = ['name', 'email', 'website', 'body',
                  'post_title', 'is_displayed', 'published_on']
