from django.contrib.auth import get_user_model

from rest_framework import generics
from rest_framework import permissions
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import PostCreateSerializer, PostListSerializer, PostUpdateSerializer
from post.models import Post

User = get_user_model()


@api_view(['POST'])
def post_create_view(request):
    """View To Create New Post For The Logged In Users"""

    if request.method == 'POST':
        token_type, token = request.META.get('HTTP_AUTHORIZATION').split()
        if(token_type != 'JWT'):
            return Response({'detail': 'No JWT Authentication Token Found'}, status=status.HTTP_400_BAD_REQUEST)

        token_data = {'token': token}

        try:
            valid_data = VerifyJSONWebTokenSerializer().validate(token_data)
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


@api_view(['POST'])
def post_update_view(request):
    """View To Update A Post For Logged In Users"""

    if request.method == 'POST':
        token_type, token = request.META.get('HTTP_AUTHORIZATION').split()
        if(token_type != 'JWT'):
            return Response({'detail': 'No JWT Authentication Token Found'}, status=status.HTTP_400_BAD_REQUEST)

        token_data = {'token': token}

        try:
            valid_data = VerifyJSONWebTokenSerializer().validate(token_data)
            logged_in_user = valid_data.get('user')
        except:
            return Response({'detail': 'Invalid Token'}, status.HTTP_400_BAD_REQUEST)

        updated_data = request.data
        instance = Post.objects.get(slug=updated_data.get('slug'))
        admin_user = User.objects.get(pk=1)  # PK Of Admin User Is 1

        if(instance.author == logged_in_user or logged_in_user == admin_user):
            updated_data.pop('slug')
            serializer = PostUpdateSerializer(instance, data=updated_data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'detail': 'Something Went Wrong.'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'detail': 'You Are Not Authorised To Edit This Post'}, status.HTTP_403_FORBIDDEN)

    else:
        return Response({'detail': 'You Are Not Authorised To Edit This Post'}, status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
def post_delete_view(request):
    """View To Delete A Post For Logged In Users"""

    if request.method == 'DELETE':
        token_type, token = request.META.get('HTTP_AUTHORIZATION').split()
        if(token_type != 'JWT'):
            return Response({'detail': 'No JWT Authentication Token Found'}, status=status.HTTP_400_BAD_REQUEST)

        token_data = {'token': token}

        try:
            valid_data = VerifyJSONWebTokenSerializer().validate(token_data)
            logged_in_user = valid_data.get('user')
        except:
            return Response({'detail': 'Invalid Token'}, status.HTTP_400_BAD_REQUEST)

        instance = Post.objects.get(slug=request.data.get('slug'))
        admin_user = User.objects.get(pk=1)  # PK Of Admin User Is 1

        if(instance.author == logged_in_user or logged_in_user == admin_user):
            instance.delete()
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Something Went Wrong.'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({'detail': 'You Are Not Authorised To Edit This Post'}, status.HTTP_403_FORBIDDEN)
