from django.urls import path
from .views import BlogListCreate_GV, BlogDetail_GV, toggle_like

urlpatterns = [
    path('', BlogListCreate_GV.as_view() ),
    path('<pk>/', BlogDetail_GV.as_view() ),
    path('<post_id>/like/', toggle_like ),
]
