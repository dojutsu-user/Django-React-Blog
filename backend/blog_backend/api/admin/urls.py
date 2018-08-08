from django.urls import path

from .post import views as post_views
from .user import views as user_views
from .comment import views as comment_views
urlpatterns = [
    path('posts/', post_views.AdminPostListView.as_view()),
    path('posts/view/<slug>/', post_views.AdminPostDetailView.as_view()),
    path('users/', user_views.AdminUserListView.as_view()),
    path('users/detail/', user_views.AdminUserDetailView.as_view()),
    path('comments/list/all/', comment_views.AllCommentsListView.as_view()),
    path('comments/detail/<pk>/', comment_views.CommentDetailView.as_view()),
    path('comments/list/<slug>/', comment_views.PostCommentsListView.as_view()),
]
