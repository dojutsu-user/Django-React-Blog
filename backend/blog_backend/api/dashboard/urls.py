from django.urls import path

from .post import views as post_views
from .user_profile import views as user_profile_views

urlpatterns = [
    path('create-new-post/', post_views.post_create_view),
    path('post-list/', post_views.PostListView.as_view()),
    path('profile/', user_profile_views.UserProfileView.as_view()),
    path('update-post/', post_views.post_update_view),
    path('delete-post/', post_views.post_delete_view),
    path('user-status/', user_profile_views.UserStatusView.as_view()),
]
