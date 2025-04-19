# """
# URL configuration for blog_app project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/5.2/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]
from django.contrib import admin
from django.urls import path

from accounts.views import RegisterView, LoginView,LogoutView
from blogs.views import (
    BlogListView,
    BlogDetailView,
    BlogCreateView,
    BlogUpdateView,
    BlogDeleteView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Auth
    path('api/register/', RegisterView.as_view()),
    path('api/login/', LoginView.as_view()),
    path('api/logout/', LogoutView.as_view(), name='logout'),

    # Blog CRUD

    path('api/blogs/create/', BlogCreateView.as_view()),  # 👈 Put this above
    path('api/blogs/', BlogListView.as_view()),
    path('api/blogs/update/<str:blog_id>/', BlogUpdateView.as_view()),
    path('api/blogs/delete/<str:blog_id>/', BlogDeleteView.as_view()),
    path('api/blogs/<str:blog_id>/', BlogDetailView.as_view()),  # 👈 Put this last
]

