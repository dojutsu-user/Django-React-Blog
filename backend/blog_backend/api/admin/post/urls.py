from django.urls import path

from . import views

urlpatterns = [
    path('posts/', views.AdminPostListView.as_view()),
    path('posts/view/<slug>/', views.AdminPostDetailView.as_view()),
]