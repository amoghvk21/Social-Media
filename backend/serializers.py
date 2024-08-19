from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('username', 'content', 'time', 'img', 'name')
    
    def save(self):
        username = self.data['username']
        content = self.data['content']
        img = self.data['img']
        name = self.data['name']

        return Post.objects.create(username=username, content=content, img=img, name=name)