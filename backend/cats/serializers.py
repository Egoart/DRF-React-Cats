from .models import Cat
from rest_framework import serializers


class CatsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cat
        fields = "__all__"