from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_post")
    post = models.CharField(max_length=300)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.DecimalField(max_digits=9, decimal_places=0)

    def serialize(self):
        return {
            "id": self.id,
            "post" : self.post,
            "timestamp": self.timestamp.strftime("%b %#d %Y, %#I:%M %p"),
            "likes": self.likes
        }
