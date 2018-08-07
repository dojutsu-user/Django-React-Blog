from django.urls import path

from . import views as comment_views

urlpatterns = [
    path('<slug>/', comment_views.comment_list_view),
    path('create/<slug>/', comment_views.comment_create_view),
]
