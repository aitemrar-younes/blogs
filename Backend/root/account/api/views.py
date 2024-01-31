from ..models import Account
from blog.models import Blog
from .serializers import AccountSerializer
from blog.api.serializers import BlogSerializer
from rest_framework.generics import RetrieveAPIView, ListAPIView

class RetrieveAccount_GV( RetrieveAPIView ):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class ListAccount_Blogs_GV( ListAPIView ):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    def get_queryset(self):
        queryset = Blog.objects.all()
        pk = self.kwargs.get('pk')
        if pk:
            queryset = queryset.filter(author__id=pk)
        return queryset