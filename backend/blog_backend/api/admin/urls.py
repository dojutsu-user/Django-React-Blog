from django.urls import path

from .post import views as post_views
from .user import views as user_views

urlpatterns = [
    path('posts/', post_views.AdminPostListView.as_view()),
    path('posts/view/<slug>/', post_views.AdminPostDetailView.as_view()),
    path('users/', user_views.AdminUserListView.as_view()),
    path('users/<pk>/', user_views.AdminUserDetailView.as_view()),
]