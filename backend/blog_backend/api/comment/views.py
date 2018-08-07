from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import CommentSerializer, CommentCreateSerializer
from comment.models import Comment
from post.models import Post


@api_view(['GET'])
def comment_list_view(request, slug):
    post_instance = get_object_or_404(Post, slug=slug)
    comment_list = Comment.objects.filter(
        post=post_instance, is_displayed=True)
    serializer = CommentSerializer(comment_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def comment_create_view(request, slug):
    post_instance = get_object_or_404(Post, slug=slug)
    request.data['post'] = post_instance.pk
    serializer = CommentCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
