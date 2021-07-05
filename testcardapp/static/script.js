let card_array = []; //объявление предварительного массива

function getCookie(name) {  //Обработка csrf токена
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken'); //полученный токен



function Generate_Card(){ //генерация карты
    let number = document.querySelector(".number-card").value; //номер
    let date_use = document.querySelector(".date-active").value; //дата
    let serial = document.querySelector(".serial").value; //серия
    let now_date = new Date(); //установка даты
    now_date.setMonth(now_date.getMonth()+1)
    switch(date_use){
        case "3 года":
            now_date.setFullYear(now_date.getFullYear()+3)
            break;
        case "1 год":
            now_date.setFullYear(now_date.getFullYear()+1)
            break;
        case "6 месяцев":
            now_date.setMonth(now_date.getMonth()+6)
            break;
        case "1 месяц":
            now_date.setMonth(now_date.getMonth()+1)
            break;
        default:
            alert( "Нет таких значений" );
    }


    for (let index = 0; index < number; index++) { //номер карты

        let random_code = Math.floor(Math.random()  * (999999 - 000001));
        switch(random_code.toString().length){
            case 5:
                random_code= "0"+random_code.toString();
                break;
            case 4:
                random_code= "00"+random_code.toString();
                break;
            case 3:
                random_code= "000"+random_code.toString();
                break;
            case 2:
                random_code= "0000"+random_code.toString();
                break;
            case 1:
                random_code= "00000"+random_code.toString();
                break;
                
        }

        let elem = document.querySelector(".elements");
        let card_element = document.createElement("div");
        card_element.className ="tamplate-elem";

        card_element.innerHTML= "<span>Серия: "+serial +"</span>"+"<span> Дата окончания: "+ now_date.getDate() + "/" + now_date.getMonth() + "/" + now_date.getFullYear()+ "</span> <span>Номер: "+random_code +"</span>";
        elem.appendChild(card_element);
        let date_card = now_date.getDate()+"."+now_date.getMonth()+"."+now_date.getFullYear();


        let cardjson={ //объявление json 
            serial: serial,
            number_card: random_code,
            date_end: date_card,
        }

        

        card_array.push(cardjson); //добавление новой json записи

    
    }
}






function Upload_Card(){ //загрузка данных н сервер
    data = JSON.stringify(card_array, null, 4);
    url =  "card_upp"
    alert(data);
    $.ajax({
        headers: {'X-CSRFToken': csrftoken},
        type:'POST',
        data: {'data': data},
        dataType: 'json',
        url:  url,       
        success: function (data) {
            console.log(data);
            console.log(data.content);
            alert("Карты загружены")
        },
        error: function (error) {
            alert("Ошибка")
        },
        complete: function(){
            window.location.reload();
        },
    });
}



