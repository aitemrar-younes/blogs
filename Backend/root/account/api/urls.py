from django.urls import path
from .views import RetrieveAccount_GV, ListAccount_Blogs_GV

urlpatterns = [
    path('<pk>/', RetrieveAccount_GV.as_view() ),
    path('<pk>/blogs/', ListAccount_Blogs_GV.as_view() ),
]
