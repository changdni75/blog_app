from rest_framework.authentication import BaseAuthentication
from accounts.models import User  # your MongoEngine user
from django.contrib.auth.models import AnonymousUser

class MongoEngineJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        user_id = request.session.get("user_id")
        if not user_id:
            return None

        try:
            user = User.objects.get(id=user_id)
            return (user, None)
        except User.DoesNotExist:
            return (AnonymousUser(), None)
