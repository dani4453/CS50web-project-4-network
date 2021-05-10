import json
from django.test import TestCase, Client, RequestFactory
from django.urls import reverse
from .models import User, Post

client = Client()

# Create your tests here.
class CreateNewPostTestCase(TestCase):

    def setUp(self):
        u1 = User.objects.create(username="Example")
        u1.set_password('pass')
        u1.save()

        p1 = Post.objects.create(user=u1, post="post1", likes=0)
        p2 = Post.objects.create(user=u1, post="post2", likes=0)
        

    def test_new_post(self):
        c = Client()
        c.login(username='Example', password='pass')
        response = c.get("/post")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)