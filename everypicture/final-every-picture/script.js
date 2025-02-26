(function(){
    'use strict';
    console.log('reading js');

    const coffee1 = document.querySelector('.coffee1');
    const dumplingPage = document.querySelector('.dumpling-page');
    const mainPage = document.querySelector('.main-page');
    const filterPage = document.querySelector('.filter-page');
    const pictureBtn = document.querySelector('button');

    coffee1.addEventListener('click', function(){
        dumplingPage.style.zIndex = 5;
        dumplingPage.style.opacity = '100%';
        mainPage.style.zIndex = 0;
        mainPage.style.opacity = 0;
    });

    pictureBtn.addEventListener('click', function(){
        filterPage.style.zIndex = 5;
        filterPage.style.opacity = '100%';
        dumplingPage.style.zIndex = 0;
        dumplingPage.style.opacity = 0;
    });

})();