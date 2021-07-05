from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.views import LoginView, LogoutView, AuthenticationForm
from django import forms



class LoginUserForm(AuthenticationForm):
    username = forms.CharField(label='Логин', widget=forms.TextInput(attrs={'class': 'form-input'}))
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput(attrs={'class': 'form-input'}))