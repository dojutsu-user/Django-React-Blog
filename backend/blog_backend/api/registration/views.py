from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import get_user_model

from .serializers import UserSignUpSerializer

User = get_user_model()


class UserSignUpView(generics.CreateAPIView):
    """View For User Registration"""

    queryset = User.objects.all()
    serializer_class = UserSignUpSerializer

    def post(self, request, *args, **kwargs):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        password1 = request.data.pop('password1')

        if (not first_name or not last_name or not email or not username):
            return Response({'detail': 'All The Fields Are Required'}, status=status.HTTP_400_BAD_REQUEST)
        elif password != password1 or not password:
            return Response({'detail': 'Error Setting The Password'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = UserSignUpSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                # user.set_password
                return Response(serializer.data, status=status.HTTP_201_CREATED)
