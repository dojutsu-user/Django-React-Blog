from rest_framework import generics

from comment.models import Comment
from .serializers import CommentListSerializer, CommentDetailSerializer
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.permissions import IsAdminUser


class AllCommentsListView(generics.ListAPIView):
    """View For Listing All The Comments"""

    queryset = Comment.objects.all().order_by('-published_on')
    serializer_class = CommentListSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)


class CommentDetailView(generics.RetrieveDestroyAPIView):
    """View To Get The Details Of A Comment"""

    queryset = Comment.objects.all()
    serializer_class = CommentDetailSerializer
    permission_classes = (IsAdminUser,)
    authentication_classes = (JSONWebTokenAuthentication,)
