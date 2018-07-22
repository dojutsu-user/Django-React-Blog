from rest_framework import generics
from rest_framework import permissions
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import PostCreateSerializer


@api_view(['POST'])
def post_create_view(request):
    """View To Create New Post For The Logged In Users"""

    if request.method == 'POST':
        token_type, token = request.META.get('HTTP_AUTHORIZATION').split()
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
