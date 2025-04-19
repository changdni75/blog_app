from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, permissions
from blogs.models import Blog
from bson import ObjectId


class BlogListView(APIView):
    permission_classes = [permissions.AllowAny] 
    def get(self, request):
        
        if 'user_id' in request.session:
            user_id = request.session['user_id']
            blogs = Blog.objects(author=user_id)
        else:
            blogs = Blog.objects()
        data = [{
            "id": str(b.id),
            "title": b.title,
            "content": b.content[:100],
            "author": str(b.author.email)
        } for b in blogs]
        return Response(data)

class BlogDetailView(APIView):
    permission_classes = [permissions.AllowAny] 
    def get(self, request, blog_id):
        blog = Blog.objects(id=ObjectId(blog_id)).first()
        if not blog:
            return Response({"error": "Blog not found"}, status=404)
        return Response({
            "id": str(blog.id),
            "title": blog.title,
            "content": blog.content,
            "author": blog.author.email
        })

class BlogCreateView(APIView):
    def post(self, request):
        print("Session ID:", request.session.session_key)
        blog = Blog(
            title=request.data.get('title'),
            content=request.data.get('content'),
            author=request.user
        )
        blog.save()
        return Response({"message": "Blog created", "id": str(blog.id)})

class BlogUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, blog_id):
        blog = Blog.objects(id=ObjectId(blog_id)).first()
        if not blog:
            return Response({"error": "Blog not found"}, status=404)
        if blog.author.id != request.user.id:
            return Response({"error": "Unauthorized"}, status=403)

        blog.update(
            title=request.data.get('title'),
            content=request.data.get('content')
        )
        return Response({"message": "Blog updated"})

class BlogDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, blog_id):
        blog = Blog.objects(id=ObjectId(blog_id)).first()
        if not blog:
            return Response({"error": "Blog not found"}, status=404)
        if blog.author.id != request.user.id:
            return Response({"error": "Unauthorized"}, status=403)

        blog.delete()
        return Response({"message": "Blog deleted"})
