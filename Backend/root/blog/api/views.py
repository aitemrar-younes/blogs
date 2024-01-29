from rest_framework.generics import ListCreateAPIView
from .serializers import BlogSerializer
from ..models import Blog

class BlogListCreate_GV(ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    def perform_create(self, serializer):
        print(serializer)
        image_file = self.request.data.get('image')
        """ print(image_file)""" 
        if image_file:
            serializer.save(thumbnail=image_file)
        else:
            serializer.save()