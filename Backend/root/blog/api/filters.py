from rest_framework.pagination import PageNumberPagination
from ..models import Blog

class BlogPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        extra_data = {
            'all': Blog.objects.all().count(),
        }
        
        response.data['extra_data'] = extra_data
        return response