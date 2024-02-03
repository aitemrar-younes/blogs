from ..models import Account
from blog.models import Blog
from .serializers import AccountSerializer
from blog.api.serializers import BlogSerializer
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

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
    


@api_view(['POST',])
def logout_view(request):
    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response(status= status.HTTP_200_OK)

class ValidateToken_GV(RetrieveAPIView):
    serializer_class = AccountSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
