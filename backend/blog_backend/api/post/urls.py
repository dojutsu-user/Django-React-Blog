from django.urls import path

from . import views

urlpatterns = [
    path('', views.PostListView.as_view()),
    path('view/<slug>/', views.PostDetailView.as_view(), name='post-detail'),
]