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
    
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(['POST',])
def logout_view(request):
    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response(status= status.HTTP_200_OK)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def validate_token(request):
    return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)