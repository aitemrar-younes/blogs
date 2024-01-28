from django.urls import path
from .views import BlogListCreate_GV

urlpatterns = [
    path('', BlogListCreate_GV.as_view() ),
]
