from django.urls import path

from . import views as registration_views

urlpatterns = [
    path('', registration_views.UserSignUpView.as_view()),
]
