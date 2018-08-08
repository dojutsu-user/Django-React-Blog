from rest_framework import serializers

from comment.models import Comment


class CommentListSerializer(serializers.ModelSerializer):
    """DRF Serializer For Listing Comments"""

    post_title = serializers.CharField(source='post.title')
    
    class Meta:
        model = Comment
        fields = ['id', 'name', 'email', 'website', 'post_title', 'is_displayed']


class CommentDetailSerializer(serializers.ModelSerializer):
    """DRF Serializer For The Detail Of A Comment"""

    class Meta:
        model = Comment
        fields = '__all__'
