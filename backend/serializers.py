from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('username', 'content', 'time', 'img')
    
    def save(self):
        username = self.data['username']
        content = self.data['content']
        print(self.data)
        img = self.data['img']
        return Post.objects.create(username=username, content=content, img=img)