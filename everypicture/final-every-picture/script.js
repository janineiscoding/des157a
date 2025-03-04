(function(){
    'use strict';
    console.log('reading js');

    const dumplingPage = document.querySelector('.dumpling-page');
    const hotpotPage = document.querySelector('.hotpot-page');
    const crepePage = document.querySelector('.crepe-page');
    const mainPage = document.querySelector('.main-page');
    const dumplingFilter = document.querySelector('.dumpling-page .filter-page');
    const hotpotFilter = document.querySelector('.hotpot-page .filter-page');
    const crepeFilter = document.querySelector('.crepe-page .filter-page');
    const overlay = document.querySelector('.black-overlay');
    const dumplingImg = document.querySelector('.dumpling-polaroid img');
    const hotpotImg = document.querySelector('.hotpot-polaroid img');
    const crepeImg = document.querySelector('.crepe-polaroid img');


    // Dumpling option on menu & take photo
    document.querySelector('.dumpling-menu').addEventListener('click', function(){
        dumplingPage.style.zIndex = 5;
        dumplingPage.style.opacity = '100%';
        dumplingPage.style.display = 'block';
        mainPage.style.display = 'none';
    });

    document.querySelector('.dumpling-page .chat button').addEventListener('click', function(){
        dumplingFilter.style.zIndex = 10;
        overlay.style.zIndex = 9;
        overlay.style.display = 'block';
        dumplingFilter.style.display = 'block';
    });

    // Hot pot option on menu & take photo

    document.querySelector('.hotpot-menu').addEventListener('click', function(){
        hotpotPage.style.zIndex = 5;
        hotpotPage.style.opacity = '100%';
        hotpotPage.style.display = 'block';
        mainPage.style.display = 'none';
    });

    document.querySelector('.hotpot-page .chat button').addEventListener('click', function(){
        hotpotFilter.style.zIndex = 10;
        hotpotFilter.style.display = 'block';
        overlay.style.zIndex = 9;
        overlay.style.display = 'block';
    });

    // Crepe option on menu & take photo

    document.querySelector('.crepe-menu').addEventListener('click', function(){
        crepePage.style.zIndex = 5;
        crepePage.style.opacity = '100%';
        crepePage.style.display = 'block';
        mainPage.style.display = 'none';
    });

    document.querySelector('.crepe-page .chat button').addEventListener('click', function(){
        crepeFilter.style.zIndex = 10;
        crepeFilter.style.display = 'block';
        overlay.style.zIndex = 9;
        overlay.style.display = 'block';
    });

    // Dumpling filter page interactions

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

    // Hot pot filter page interactions

    document.querySelector('.hotpot-page .filter-page .filters .sat-option').addEventListener('click', function(){
        hotpotImg.src = "images/sat-hotpot.jpg";
    })

    document.querySelector('.hotpot-page .filter-page .filters .weird-option').addEventListener('click', function(){
        hotpotImg.src = "images/weird-hotpot.jpg";
    })

    document.querySelector('.hotpot-page .filter-page .filters .purple-option').addEventListener('click', function(){
        hotpotImg.src = "images/purple-hotpot.jpg";
    })

    document.querySelector('.hotpot-page .filter-page .filters .gradient-option').addEventListener('click', function(){
        hotpotImg.src = "images/gradient-hotpot.jpg";
    })

    document.querySelector('.hotpot-page .filter-page .done').addEventListener('click', function(){
        location.reload();
    })

    // Crepe filter page interactions

    document.querySelector('.crepe-page .filter-page .filters .sat-option').addEventListener('click', function(){
        crepeImg.src = "images/sat-crepe.jpg";
    })

    document.querySelector('.crepe-page .filter-page .filters .weird-option').addEventListener('click', function(){
        crepeImg.src = "images/weird-crepe.jpg";
    })

    document.querySelector('.crepe-page .filter-page .filters .purple-option').addEventListener('click', function(){
        crepeImg.src = "images/purple-crepe.jpg";
    })

    document.querySelector('.crepe-page .filter-page .filters .gradient-option').addEventListener('click', function(){
        crepeImg.src = "images/gradient-crepe.jpg";
    })

    document.querySelector('.crepe-page .filter-page .done').addEventListener('click', function(){
        location.reload();
    })

})();