from rest_framework import generics
from rest_framework import permissions
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import PostCreateSerializer, PostListSerializer
from post.models import Post


@api_view(['POST'])
def post_create_view(request):
    """View To Create New Post For The Logged In Users"""

    if request.method == 'POST':
        token_type, token = request.META.get('HTTP_AUTHORIZATION').split()
        if(token_type != 'JWT'):
            return Response({'detail': 'No JWT Authentication Token Found'}, status=status.HTTP_400_BAD_REQUEST)

        data = {'token': token}

        try:
            valid_data = VerifyJSONWebTokenSerializer().validate(data)
            user = valid_data.get('user')
        except:
            return Response({'detail': 'Invalid Token'}, status.HTTP_400_BAD_REQUEST)

        data = request.data
        data['author'] = user.pk  # Adding User ID Of The Author
        serializer = PostCreateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)


class PostListView (generics.ListAPIView):
    """List View For Listing All The Posts Of A Particular User"""

    serializer_class = PostListSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        user = request.user
        if user is not None:
            queryset = Post.objects.filter(author=user)
        else:
            return Response({'detail': 'ERROR...!!! User Must Be Logged In.'})
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
