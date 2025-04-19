from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import logout
from django.contrib.auth.models import AnonymousUser
from accounts.models import User

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny] 

    def post(self, request):
        data = request.data
        if User.objects(email=data['email']).first():
            return Response({"error": "User already exists"}, status=400)
        user = User(email=data['email'], password=make_password(data['password']))
        user.save()
        return Response({"message": "User registered"})

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        user = User.objects(email=data['email']).first()

        if user and check_password(data['password'], user.password):
            # Manually set the session key (instead of using login())
            request.session['user_id'] = str(user.id)  # Manually setting session key

            return Response({
                "message": "Login successful",
                "user_id": str(user.id),
            })
        
        return Response({"error": "Invalid credentials"}, status=401)

class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        if isinstance(request.user, AnonymousUser):
            return Response({"error": "User not logged in"}, status=400)
        logout(request)
        return Response({"message": "Logged out"})
