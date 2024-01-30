from django.db import models
from account.models import Account

class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    thumbnail = models.ImageField(upload_to='images/', null=True, blank=True)
    creation_date = models.DateField(auto_now=True)
    modification_date = models.DateField(auto_now_add=True)

    author = models.ForeignKey(Account, on_delete=models.PROTECT)
    
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['creation_date', 'modification_date', 'title']