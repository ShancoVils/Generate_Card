
from django.http.response import HttpResponse
from django.shortcuts import render,redirect
from django.http import request
from django.template import  loader
from .models import Cards
import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from .forms import LoginUserForm
from django.contrib.auth.views import LoginView
from django.contrib.auth import logout



# Create your views here.



def main(request):
    template = loader.get_template('index.html')
    context= {'Cards': Cards.objects.all().order_by('-id')}
    render_page = template.render(context,request)
    return HttpResponse(render_page)


class LoginUser( LoginView):
    form_class = LoginUserForm
    template_name = 'index.html'


def logout_user(request):
    logout(request)
    return redirect('home')



def upload_card(request):
    arry = request.POST.get('data') #получение данных с сервера
    result = {"content":""}
    if arry is None: #Небольшая проверка
        result['content'] = arry        
    else:
        if arry:
            result['content'] = "Данные есть "+arry
        else:
            result['content'] = "ЭЭЭ"

   
    card_string = json.loads(arry) # из json в список
    caunt_card = len(card_string) # длинна списка
    

    i=0
    while caunt_card>i: # цикл добавление в бд
        card_number=card_string[i]['number_card']
        card_serial=card_string[i]['serial']
        card_date=card_string[i]['date_end']
        Cards.objects.create(serial=card_serial, number_card=card_number, date_end=card_date)
        i=i+1



    return JsonResponse(caunt_card, safe=False)


