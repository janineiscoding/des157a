(function(){
    'use strict';
    console.log('reading js');

    const dumplingOption = document.querySelector('.dumpling-menu');
    const hotpotOption = document.querySelector('.hotpot-menu');
    const dumplingPage = document.querySelector('.dumpling-page');
    const hotpotPage = document.querySelector('.hotpot-page');
    const mainPage = document.querySelector('.main-page');
    const dumplingFilter = document.querySelector('.dumpling-page .filter-page');
    const hotpotFilter = document.querySelector('.hotpot-page .filter-page');
    const overlay = document.querySelector('.black-overlay');
    const dumplingImg = document.querySelector('.dumpling-polaroid img');

    dumplingOption.addEventListener('click', function(){
        dumplingPage.style.zIndex = 5;
        dumplingPage.style.opacity = '100%';
        dumplingPage.style.display = 'block';
        mainPage.style.display = 'none';
    });

    document.querySelector('.dumpling-page .chat button').addEventListener('click', function(){
        dumplingFilter.style.zIndex = 10;
        overlay.style.zIndex = 9;
        overlay.style.display = 'block';
        // dumplingFilter.style.opacity = '100%';
        dumplingFilter.style.display = 'block';
        // dumplingPage.style.zIndex = 0;
        // dumplingPage.style.opacity = 0;
    });

    hotpotOption.addEventListener('click', function(){
        hotpotPage.style.zIndex = 5;
        hotpotPage.style.opacity = '100%';
        hotpotPage.style.display = 'block';
        mainPage.style.display = 'none';
    });

    document.querySelector('.hotpot-page .chat button').addEventListener('click', function(){
        hotpotFilter.style.zIndex = 10;
        overlay.style.zIndex = 9;
        overlay.style.display = 'block';
        hotpotFilter.style.display = 'block';
    });

    // Not the best code, but the easiet for me to do right now

    document.querySelector('.dumpling-page .filter-page .filters .sat-option').addEventListener('click', function(){
        dumplingImg.src = "images/sat-dumpling.jpg";
    })

    document.querySelector('.dumpling-page .filter-page .filters .weird-option').addEventListener('click', function(){
        dumplingImg.src = "images/weird-dumpling.jpg";
    })

    document.querySelector('.dumpling-page .filter-page .filters .purple-option').addEventListener('click', function(){
        dumplingImg.src = "images/purple-dumpling.jpg";
    })

    document.querySelector('.dumpling-page .filter-page .filters .gradient-option').addEventListener('click', function(){
        dumplingImg.src = "images/gradient-dumpling.jpg";
    })

    document.querySelector('.done').addEventListener('click', function(){
        location.reload();
    })

})();