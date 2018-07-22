from django.urls import path

from .post import views as post_views

urlpatterns = [
    path('create-new-post/', post_views.post_create_view),
]