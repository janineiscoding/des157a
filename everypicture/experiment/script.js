(function(){
    'use strict';
    console.log('reading js');

    const button0 = document.querySelector('.button0');
    const button1 = document.querySelector('.button1');
    const button2 = document.querySelector('.button2');
    const button3 = document.querySelector('.button3');
    const myImg = document.querySelector('.changeFilter img');

    button0.addEventListener('click', function(){
        myImg.className = 'nofilter';
    });

    button1.addEventListener('click', function(){
        myImg.className = 'filter1';
    });

    button2.addEventListener('click', function(){
        myImg.className = 'filter2';
    });

    button3.addEventListener('click', function(){
        myImg.className = 'filter3';
    });

})();