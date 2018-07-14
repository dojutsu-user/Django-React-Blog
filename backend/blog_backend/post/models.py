from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Post(models.Model):
    """Model For Blog Posts"""

    title = models.CharField(max_length=100)
    body = models.TextField()
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts', related_query_name='post')
    slug = models.SlugField()
    is_published = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    published_on = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        indexes = [models.Index(fields=['slug'])]
