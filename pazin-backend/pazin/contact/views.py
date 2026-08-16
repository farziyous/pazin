from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, throttling
from django.core.mail import send_mail
from django.conf import settings

from .serializers import ContactMessageSerializer


class ContactThrottle(throttling.AnonRateThrottle):
    rate = "5/hour"


class ContactMessageView(APIView):
    throttle_classes = [ContactThrottle]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        name = serializer.validated_data["name"]
        phone = serializer.validated_data["phone"]
        message = serializer.validated_data["message"]

        subject = f"پیام جدید از {name}"
        body = f"نام: {name}\nشماره تماس: {phone}\n\nپیام:\n{message}"

        try:
            send_mail(
                subject,
                body,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_FORM_RECIPIENT],
                fail_silently=False,
            )
        except Exception:
            return Response(
                {"error": "ارسال پیام با خطا مواجه شد"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({"success": True}, status=status.HTTP_200_OK)