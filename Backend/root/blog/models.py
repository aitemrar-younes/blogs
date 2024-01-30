from django.db import models

class Blog(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    thumbnail = models.ImageField(upload_to='images/', null=True, blank=True)
    creation_date = models.DateField(auto_now=True)
    modification_date = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['creation_date', 'modification_date', 'title']