from rest_framework.generics import ListCreateAPIView
from .serializers import BlogSerializer
from ..models import Blog

class BlogListCreate_GV(ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer