from django.contrib import admin

from .models import Post
from comment.models import Comment


class CommentInline(admin.StackedInline):
    model = Comment


class PostAdmin(admin.ModelAdmin):

    def post_comment_count(self, obj):
        return Comment.objects.filter(post=obj).count()

    post_comment_count.short_description = 'Total Comments'

    inlines = [
        CommentInline,
    ]
    list_display = ['title', 'author', 'is_published', 'post_comment_count']


admin.site.register(Post, PostAdmin)
