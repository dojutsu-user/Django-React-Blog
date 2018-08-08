from rest_framework import generics

from comment.models import Comment
from .serializers import CommentListSerializer, CommentDetailSerializer
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from rest_framework.response import Response


class AllCommentsListView(generics.ListAPIView):
    """View For Listing All The Comments"""

    queryset = Comment.objects.all().order_by('-published_on')
    serializer_class = CommentListSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """View To Get The Details Of A Comment"""

    queryset = Comment.objects.all()
    serializer_class = CommentDetailSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)


class PostCommentsListView(generics.ListAPIView):
    """View To Get The List Of Comments Of A Particular Post"""

    def get(self, request, *args, **kwargs):
        queryset = Comment.objects.filter(
            post__slug=kwargs.get('slug')).order_by('-published_on')
        serializer = CommentListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
