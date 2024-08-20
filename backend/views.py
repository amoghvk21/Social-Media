from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import PostSerializer
from .models import Post, Following
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from backend.ChatGPT import ChatGPT


class GetPostsView(APIView):

    # sort by time and only gets first 10
    serializer_class = PostSerializer

    def post(self, request):
        username = request.data['username']
        fs = Following.objects.filter(username1=username)
        usernames = [f.username2 for f in fs]

        posts = list(reversed(Post.objects.filter(username__in=usernames)))[:10]

        ans = []
        for p in posts:
            ans.append(PostSerializer(p).data)
            ans[-1]['img'] = "http://localhost:8000" + ans[-1]['img']
            
        return Response({'posts': ans})


class CreatePostView(APIView):

    parser_classes = [MultiPartParser, FormParser]
    serializer_class = PostSerializer

    def post(self, request):
        try:
            # Get data from POST request
            username = request.data['username']
            content = request.data['content']
            img = request.data['img']
            name = request.data['name']
            
            # Check if not offensive
            offensive, reason = ChatGPT(content)
            print(offensive)
            if not offensive:
                post = Post(username=username, content=content, img=img, name=name)
                post.save()
                return Response({'message': 'success'}, status=200)
            else:
                print('this executed')
                return Response({'message': 'offensive', 'reason': reason}, status=403)
        except:
            return Response({'message': 'error'}, status=400)


class GetExploreView(generics.ListAPIView):
    # sort by time and only gets first 10
    serializer_class = PostSerializer

    def get_queryset(self):
        return list(reversed(Post.objects.all()))[:10]


class ToggleFollowingView(APIView):

    def post(self, request):
        try:
            username1 = request.data['username1']
            username2 = request.data['username2']

            q = Following.objects.filter(username1=username1, username2=username2)
            if q.exists():
                # remove
                q.delete()
                return Response({'message': f'{username1} now does not follow {username2}'}, status=200)
            else:
                # add
                f = Following(username1=username1, username2=username2)
                f.save()
                return Response({'message': f'{username1} now follows {username2}'}, status=200)
        except:
            return Response({'message': 'error'}, status=400)