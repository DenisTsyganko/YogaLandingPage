window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a){
        for (let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click',function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tab.length; i++){
                if (target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    //timer
    let deadLine = '2022-07-24';

    function getTimeRemaining(endTime){
        let t = Date.parse(endTime) - Date.parse(new Date),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/1000/60/60);
        
        if (t < 0){
            seconds = minutes = hours = '00';
        }

        function checkZero(num){
            if (num >= 10){
                return num;
            } else {
                return '0' + num;
            }
        }

        return {
            'total' : t,
            'seconds' : checkZero(seconds),
            'minutes' : checkZero(minutes),
            'hours' : checkZero(hours)
        };
    }

    function setClock(id,endTime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock,1000);

        function updateClock(){
            let t = getTimeRemaining(endTime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if(t.total <= 0){
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

            }
        }
        
    }

    setClock('timer',deadLine);

    // modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click',function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let infoDiv = document.querySelector('.info');
    infoDiv.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('description-btn')){
            overlay.style.display = 'block';
            more.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    });

    
    // Form
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function clearInput(input){
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }
    
    form.addEventListener('submit', event => {
        function sendRequest(event) {
            return new Promise(function(resolve, reject){
                let formData = new FormData(form);
                let obj = {};
                formData.forEach(function(value, key) {
                    obj[key] = value;
                });
                let json = JSON.stringify(obj);

                clearInput(input);
                form.appendChild(statusMessage);    

                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                request.send(json);
                

                request.addEventListener('readystatechange',() =>{
                    if (request.readyState < 4) {
                        resolve();
                    } else if(request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
        event.preventDefault();
        sendRequest()
        .then(() => {statusMessage.innerHTML = message.loading;console.log(1);})
        .then(() => {statusMessage.innerHTML = message.success;console.log(2)})
        .catch(() => {statusMessage.innerHTML = message.failure;console.log(3)});
    });

    //Contact form
    let contactForm = document.querySelector('form'),
        contactInput = contactForm.getElementsByTagName('input');
    
    contactForm.addEventListener('submit', event => {
        function sendConact(event) {
            return new Promise(function(resolve,reject){
                contactForm.appendChild(statusMessage);

                let formData = new FormData(contactForm);
                let obj = {};
                formData.forEach(function(value, key) {
                    obj[key] = value;
                });
                let json = JSON.stringify(obj);
                clearInput(contactInput);
                
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                request.send(json);
                
                request.addEventListener('readystatechange',() =>{
                    if (request.readyState < 4) {
                        resolve();
                    } else if(request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        } 
        event.preventDefault();
        sendConact()
        .then(() => {statusMessage.innerHTML = message.loading;console.log(1);})
        .then(() => {statusMessage.innerHTML = message.success;console.log(2)})
        .catch(() => {statusMessage.innerHTML = message.failure;console.log(3)});
    });


    //Slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n){
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n){
        showSlides(slideIndex += n);
    }

    function currentSlide(n){
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', () => plusSlides(-1));
    next.addEventListener('click',() => plusSlides(1));
    dotsWrap.addEventListener('click', function(event){
        for (let i = 0; i < dots.length; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i]){
                currentSlide(i+1);
            }
        }
    });

    // Calculator
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.textContent = total;

    persons.addEventListener('input', function(){
        personsSum = +this.value;
        if(personsSum == 0) {
            totalValue.textContent = 0;
            return;
        }
        total = (daysSum + personsSum)*4000;
        if(!restDays.value){
            totalValue.textContent = 0;
        } else {
            totalValue.textContent = total;
        }
    });

    restDays.addEventListener('input', function(){
        daysSum = +this.value;
        if(daysSum == 0) {
            totalValue.textContent = 0;
            return;
        }
        total = (daysSum + personsSum)*4000;
        if(!persons.value){
            totalValue.textContent = 0;
        } else {
            totalValue.textContent = total;
        }
    });
    place.addEventListener('change', function(){
        if(persons.value == '' || restDays.value == ''){
            totalValue.textContent = 0;
        } else{
            totalValue.textContent = total * this.options[this.selectedIndex].value;
        }
    });
});