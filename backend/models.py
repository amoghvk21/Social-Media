from django.db import models


def f(instance, filename):
    ext = filename.split('.')[-1]
    if instance.pk:
        return f'backend\static\\backend\img\{instance.pk}.{ext}'
    else:
        pass


class Post(models.Model):
    username = models.CharField(max_length=20, blank=False, null=False)
    name = models.CharField(max_length=20, blank=False, null=False)
    content = models.CharField(max_length=100, blank=False, null=False)
    time = models.DateTimeField(auto_now=True)
    img = models.ImageField(blank=False, null=False, upload_to='backend/static/media/')

    def __str__(self):
        return f'{self.username}: {self.content} with {self.img.name}'


class Following(models.Model):
    username1 = models.CharField(max_length=20, blank=False, null=False)
    username2 = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self):
        return f'{self.username1} follows {self.username2}'