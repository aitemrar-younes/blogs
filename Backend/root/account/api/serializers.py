from rest_framework import serializers
from ..models import Account

class AccountSerializer(serializers.ModelSerializer):
    """ blogs_count = serializers.SerializerMethodField(read_only=True) """
    class Meta:
        model = Account
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'bio', 'profile_picture' )
    """ def get_blogs_count(self, author):
        return Blog.objects.filter(author=author).count() """