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

            if(t.total < 0){
                clearInterval(timeInterval);
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

    /*
    class Options{
        constructor(height, width){
            this.height = height;
            this.width = width;
            this.bg = 'white';
            this.fontSize = '14px';
            this.textAlign = 'center';
        }

        createDiv = function(text) {
            let div = document.createElement('div');
            div.textContent = text;
            div.style.background = this.bg;
            div.style.fontSize = this.fontSize;
            div.style.textAlign = this.textAlign;
            div.style.height = this.height + 'px';
            div.style.width = this.width + 'px';
            return div;
        }
    }

    let opt = new Options(200,400);
    let div = opt.createDiv('Hello');
    info.appendChild(div);
    */
});