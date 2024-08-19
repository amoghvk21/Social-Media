from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import PostSerializer
from .models import Post
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from backend.ChatGPT import ChatGPT


class GetPostsView(generics.ListAPIView):
    
    # sort by time and only gets first 10
    #queryset = list(reversed(Post.objects.all()))
    serializer_class = PostSerializer

    def get_queryset(self):
        return list(reversed(Post.objects.all()))[:10]


class CreatePostView(APIView):

    parser_classes = [MultiPartParser, FormParser]
    serializer_class = PostSerializer

    def post(self, request):
        try:
            # Get data from POST request
            username = request.data['username']
            content = request.data['content']
            img = request.data['img']
            
            # Check if not offensive
            offensive, reason = ChatGPT(content)
            print(offensive)
            if not offensive:
                post = Post(username=username, content=content, img=img)
                post.save()
                return Response({'message': 'success'}, status=200)
            else:
                print('this executed')
                return Response({'message': 'offensive', 'reason': reason}, status=403)
        except:
            return Response({'message': 'error'}, status=400)