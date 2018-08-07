from rest_framework import serializers

from comment.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """DRF Serializer For Listing Published Comment"""

    class Meta:
        model = Comment
        fields = ['name', 'website', 'body', 'published_on']


class CommentCreateSerializer(serializers.ModelSerializer):
    """DRF Serializer Fpr Creating Comments By The User"""

    class Meta:
        model = Comment
        fields = ['name', 'website', 'body', 'post', 'email']
