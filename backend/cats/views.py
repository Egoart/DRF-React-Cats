from django import views
from django.shortcuts import render
from .models import Cat
from .serializers import CatsSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response

# Create your views here.

class CatViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Cat.objects.all()
        serializer = CatsSerializer(queryset, many=True)
        return Response(serializer.data)


class CatPopulator(generics.ListCreateAPIView):
    queryset = Cat.objects.all()
    serializer_class = CatsSerializer

    def create(self, request, *args, **kwargs):
        many = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, headers=headers)
