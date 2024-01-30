from django.urls import path
from .views import BlogListCreate_GV, BlogDetail_GV

urlpatterns = [
    path('', BlogListCreate_GV.as_view() ),
    path('<pk>/', BlogDetail_GV.as_view() ),
]
