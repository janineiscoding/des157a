(function(){
    'use strict';
    console.log('reading js');

    const formPage = document.querySelector('.form');
    const resultPage = document.querySelector('.result');
    const rejectPage = document.querySelector('.reject');
    const hirePage = document.querySelector('.hire');
    // const formH1 = document.querySelector('.form header h1');

    // Submit, hire, and reject buttons

    document.querySelector('.submitDiv').addEventListener('click', function(event) {
        event.preventDefault();

        // form input into result page
        const formH1 = document.querySelector('.form header h1');
        const plNoun = document.querySelector('#plNoun').value;
        const length = document.querySelector('#length').value;
        const year = document.querySelector('#year').value;
        const street = document.querySelector('#street').value;
        const number1 = document.querySelector('#number').value;
        const body1 = document.querySelector('#body1').value;
        const verb = document.querySelector('#verb').value;
        const power = document.querySelector('#power').value;
        const noun = document.querySelector('#noun').value;
        const fruit = document.querySelector('#fruit').value;
        const body2 = document.querySelector('#body2').value;
        const number2 = Math.floor(number1 / 2);

        const plNounInsert = document.querySelector('.plNounInsert');
        const lengthInsert = document.querySelector('.lengthInsert');
        const yearInsert = document.querySelector('.yearInsert');
        const streetInsert = document.querySelector('.streetInsert');
        const number1Insert = document.querySelector('.number1Insert');
        const body1Insert = document.querySelector('.body1Insert');
        const verbInsert = document.querySelector('.verbInsert');
        const powerInsert = document.querySelector('.powerInsert');
        const nounInsert = document.querySelector('.nounInsert');
        const fruitInsert = document.querySelector('.fruitInsert');
        const body2Insert = document.querySelector('.body2Insert');
        const street2Insert = document.querySelector('.street2Insert');
        const number2Insert = document.querySelector('.number2Insert');



        if(plNoun === '' || length === '' || year === '' || street === '' || number1 === '' || body1 === '' || verb === '' || power === '' || noun === '' || fruit === '' || body2 === ''){
            formH1.innerHTML = 'Please fill all words! -PHANNY';
            document.querySelector('.form header h1').focus();
        } else {
            // const number2Insert = number2;

            // move and show pages
            resultPage.style.setProperty('z-index', '6');
            resultPage.style.setProperty('opacity', '100%');
            formPage.style.setProperty('opacity', '0%');
            formPage.style.setProperty('z-index', '-1');

            plNounInsert.innerHTML = plNoun;
            lengthInsert.innerHTML = length;
            yearInsert.innerHTML = year;
            streetInsert.innerHTML = street;
            number1Insert.innerHTML = number1;
            body1Insert.innerHTML = body1;
            verbInsert.innerHTML = verb;
            powerInsert.innerHTML = power;
            nounInsert.innerHTML = noun;
            fruitInsert.innerHTML = fruit;
            body2Insert.innerHTML = body2;
            number2Insert.innerHTML = number2;
            street2Insert.innerHTML = street;
        }
    });

    document.querySelector('.hireBtn').addEventListener('click', function(event) {
        event.preventDefault();
        // move and hide pages
        hirePage.style.setProperty('z-index', '7');
        resultPage.style.setProperty('opacity', '0%');
        formPage.style.setProperty('opacity', '0%');
        rejectPage.style.setProperty('opacity', '0%');
    });

    document.querySelector('.rejectBtn').addEventListener('click', function(event) {
        event.preventDefault();
        // move and hide pages
        rejectPage.style.setProperty('z-index', '7');
        resultPage.style.setProperty('opacity', '0%');
        formPage.style.setProperty('opacity', '0%');
        hirePage.style.setProperty('opacity', '0%');
    });


})();