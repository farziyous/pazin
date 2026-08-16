from django.urls import path
from .views import ContactMessageView

urlpatterns = [
    path("", ContactMessageView.as_view(), name="send-contact-message"),
]