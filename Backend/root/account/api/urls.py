from django.urls import path
from .views import RetrieveAccount_GV, ListAccount_Blogs_GV
from rest_framework.authtoken.views import obtain_auth_token
from .views import logout_view, ValidateToken_GV

urlpatterns = [
    path('login/', obtain_auth_token),
    path('logout/', logout_view),
    path('alive/', ValidateToken_GV.as_view()),
    path('<int:pk>/blogs/', ListAccount_Blogs_GV.as_view() ),
    path('<pk>/', RetrieveAccount_GV.as_view() ),
]
