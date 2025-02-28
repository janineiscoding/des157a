(function(){
    'use strict';
    console.log('reading js');

    const dumplingOption = document.querySelector('.dumpling-menu');
    const dumplingPage = document.querySelector('.dumpling-page');
    const mainPage = document.querySelector('.main-page');
    const dumplingFilter = document.querySelector('.dumpling-page .filter-page');
    const takeDumplingPic = document.querySelector('.dumpling-page .chat button');
    const sectionTag = document.querySelector('section');

    dumplingOption.addEventListener('click', function(){
        dumplingPage.style.zIndex = 5;
        dumplingPage.style.opacity = '100%';
        mainPage.style.zIndex = 0;
        mainPage.style.opacity = 0;
    });

    takeDumplingPic.addEventListener('click', function(){
        dumplingPage.style.opacity = '50%';
        dumplingFilter.style.zIndex = 10;
        dumplingFilter.style.opacity = '100%';
        // dumplingPage.style.zIndex = 0;
        // dumplingPage.style.opacity = 0;
    });




})();