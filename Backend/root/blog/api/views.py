from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import BlogSerializer, BlogCreateSerializer
from ..models import Blog, Like
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


class BlogListCreate_GV(ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BlogCreateSerializer
        return BlogSerializer
    def perform_create(self, serializer):
        image_file = self.request.data.get('image')
        if image_file:
            serializer.save(thumbnail=image_file)
        else:
            serializer.save()

class BlogDetail_GV(RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return BlogCreateSerializer
        return BlogSerializer
    def perform_update(self, serializer):
        image_file = self.request.data.get('image')
        if image_file:
            serializer.save(thumbnail=image_file)
        else:
            serializer.save()


@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def toggle_like(request, post_id):
    blog = get_object_or_404(Blog, id=post_id)
    user = request.user
    if request.method == "GET":
        liked = Like.objects.filter(user=user, blog=blog).exists()
        data = {'liked': liked, }
        return JsonResponse(data)
    if request.method == "POST":
        try:
            like = Like.objects.get(user=user, blog=blog)
            like.delete()
            liked = False
        except Like.DoesNotExist:
            Like.objects.create(user=user, blog=blog)
            liked = True
        data = {'liked': liked, } # 'likes_count': blog.like_set.count()
        return JsonResponse(data)
