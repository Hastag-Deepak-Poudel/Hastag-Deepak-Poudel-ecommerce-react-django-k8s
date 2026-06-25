from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
url = reverse('products')


class BasicTests(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(
            username="deepak",
            password="testpass123"
        )
        self.assertEqual(user.username, "deepak")

    def test_home_page(self):
        response = self.client.get(reverse("products"))
        self.assertEqual(response.status_code, 200)