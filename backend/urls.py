from django.contrib import admin
from django.urls import  path
from .views import GetPostsView, CreatePostView

urlpatterns = [
    path('getposts/', GetPostsView.as_view(), name='getposts'),
    path('createpost/', CreatePostView.as_view(), name='createpost')
]