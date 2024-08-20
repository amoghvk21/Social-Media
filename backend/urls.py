from django.urls import  path
from .views import GetPostsView, CreatePostView, GetExploreView, ToggleFollowingView

urlpatterns = [
    path('getposts/', GetPostsView.as_view(), name='getposts'),
    path('createpost/', CreatePostView.as_view(), name='createpost'),
    path('getexplore/', GetExploreView.as_view(), name='getexplore'), 
    path('togglefollowing/', ToggleFollowingView.as_view(), name='togglefollowing')
]