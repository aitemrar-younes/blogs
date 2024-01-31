from ..models import Blog
from account.api.serializers import AccountSerializer
from rest_framework import serializers

class BlogSerializer(serializers.ModelSerializer):
    author = AccountSerializer()
    class Meta:
        model = Blog
        fields = '__all__'

class BlogCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'