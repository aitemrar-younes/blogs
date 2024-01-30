from rest_framework import serializers
from ..models import Account

class AccountSerializer(serializers.ModelField):
    class Meta:
        model = Account
        fields = '__all__'