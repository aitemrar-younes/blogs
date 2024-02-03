from ..models import Blog
from account.api.serializers import AccountSerializer
from rest_framework import serializers


class BlogSerializer(serializers.ModelSerializer):
    author = AccountSerializer()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = '__all__'

    def get_likes_count(self, obj):
        return obj.like_set.count()

class BlogCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        exclude = ('author',)

    def create(self, validated_data):
        # Include the authenticated user in the data
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)