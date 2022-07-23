'use strict';

class Options{
    constructor(height, width){
        this.height = height;
        this.width = width;
        this.bg = 'grey';
        this.fontSize = '14 px';
        this.textAlign = '';
    }

    createDiv = function(text) {
        div = document.createElement(div);
    }
}

let opt = new Options(200,400);
console.log(opt);