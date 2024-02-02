from django.db.models.signals import post_save,post_delete
#I have used django user model to use post save, post delete.
from .models import Blog
from django.dispatch import receiver

""" @receiver(post_save,sender=User)
def create_profile(sender,instance,created,**kwargs):
    if created:
        #write your logic here
        print("User Profile Created") """
        
@receiver(post_delete,sender=Blog)
def delete_profile(sender,instance,*args,**kwargs):
    #write your login when user profile is deleted.
    print("Blog Deleted")