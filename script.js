let messages = {
    loading: 'Загрузка...',
    succses: 'Спасибо, мы свяжемся с вами в ближайшее время',
    error: 'Что-то пошло не так...'
};

let form = document.querySelector('.feed-form'),
    input = form.querySelectorAll('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');


    form.addEventListener('submit', function (event) {
        event.preventDefault();//сбрасывает перезагрузку браузера
        form.appendChild(statusMessage);//добавляет в форму статус заказа

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');//метод и файл пхп
        request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);//чтобы получить все данные из инпутов, внутрь формдаты помещают что заполнил пользователь
        request.send(formData);//отправляет на сервер



        request.addEventListener('readystatechange', function() {//наблюдает за изменением 
            if (request.readyState < 4) {
                statusMessage.innerHTML = messages.loading;//если сервер тупит 
            } else if (request.readyState == 4 && request.status == 200) {//если запрос отправился
                statusMessage.innerHTML = messages.succses;
            } else {//если пошла ошибка
                statusMessage.innerHTML = messages.error;
            }
        });

        input.forEach(function(item) {//очищает все инпуты после отправки
            item.value = '';
        });
    });





