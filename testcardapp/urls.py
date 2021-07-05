from . import views
from django.urls import path, include
from .views import LoginUser





urlpatterns = [
    path('', views.main, name='home'),
    path('card_upp', views.upload_card, name='upload_card'),
    path('autorize', LoginUser.as_view(), name='login'),
    path('logout/', views.logout_user, name='logout'),

]
