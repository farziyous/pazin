from rest_framework import serializers

class ContactMessageSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=20)
    message = serializers.CharField(max_length=2000)