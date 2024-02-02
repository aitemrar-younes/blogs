from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import BlogSerializer, BlogCreateSerializer
from ..models import Blog

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