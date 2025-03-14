(function(){
    'use strict';
    console.log('reading JS');

    // variables for interface elements

    const bttn = document.querySelector('#action a');
    const game1 = document.querySelector('#game1');
    const game2 = document.querySelector('#game2');
    const message = document.querySelector('.score-box #message');
    const action = document.querySelector('#action');
    const currentScore = document.querySelector('#score span');
    const help = document.querySelector('.help');
    const scoreBox = document.querySelector('.score-box');
    /* The variable below uses let because these elements are going to be
    removed from the page and added back in, so that event listeners can be
    removed and added back on to them. */
    let pads = document.querySelectorAll('#game1 div');
    let pads2 = document.querySelectorAll('#game2 div');
    //counter is used to determine if we are done with the sequence
    let counter = 0;
    let counter2 = 0;

    let p1Status = 0;
    let p2Status = 0;

    // help pop up
    document.querySelector('button').addEventListener('click', function(){
        help.style.display = 'block';
        scoreBox.style.zIndex = '-1';
    })

    document.querySelector('.close').addEventListener('click', function(){
        help.style.display = 'none';
        scoreBox.style.zIndex = 1;
    })


    // object keeps track of data within the game
    const gameData1 = {
        count: 3,
        increment: 3,
        score: 0,
        speed: 300,
        sequence: [0, 0, 0],
        match: [1, 1, 1]
    }

    const gameData2 = {
        count: 3,
        increment: 3,
        score: 0,
        speed: 300,
        sequence: [0, 0, 0],
        match: [1, 1, 1]
    }

    // Gets the game started
    bttn.addEventListener('click', function(event){
        event.preventDefault();
        gameData1.sequence = [];
        gameData2.sequence = [];

        // glenda added to reset the match array
        gameData1.match = [];
        gameData2.match = [];

        callSequence1(gameData1.count, gameData1.speed);
        callSequence2(gameData2.count, gameData2.speed);

        // from glenda: once the game play is started I think the instructions and button should be removed because they get in the way of focusing on the sequence
        message.innerHTML = '';
        bttn.innerHTML = 'Match the pattern';
    });

    // Continue matching sequence
    function nextSequence(event){
        // event.preventDefault();
        gameData1.sequence = [];

        // glenda added to reset the match array
        gameData1.match = [];
        counter = 0;

        callSequence1(gameData1.count, gameData1.speed);

        // from glenda: once the game play is started I think the instructions and button should be removed because they get in the way of focusing on the sequence
        message.innerHTML = '';
    };
    function nextSequence2(event){
        gameData2.sequence = [];
        gameData2.match = [];
        counter2 = 0;
        callSequence2(gameData2.count, gameData2.speed);
        message.innerHTML = '';
    };

    // A recursive function for creating the call sequence
    function callSequence1(sequenceLength, sequenceSpeed){
        /* reassigning padds because after the first round they will be
        removed from the DOM and re-added in the setupNextRound function */
        pads = document.querySelectorAll('#game1 div');
        // This settimeOut is set for 600ms so the animation on the pad can finish.
        setTimeout( function(){
            //removes the .on class which has the animation for all the pads
            for( const eachPad of pads ){
                eachPad.removeAttribute('class');
            }
            // generate a random number between 1 & 4...
            const num = Math.floor(Math.random()*4)+1;
            // push the random number in the gameData.sequence object
            gameData1.sequence.push(num);
            // animate the corresponding pad
            document.querySelector(`#pad${num}`).className = 'on';
            // increment the counter 
            counter++;
            /* If the sequence is not finishd, run the function again and
            animate the next pad in the sequence */ 
            if(counter < sequenceLength){
                /* this settimeOut runs for different lengths of time,
                as determined by the program. As the game continues the wait time 
                is shorter and shorter*/
                setTimeout(function(){
                    for( const eachPad of pads ){
                        eachPad.removeAttribute('class');
                    }
                    callSequence1(sequenceLength, sequenceSpeed);
                }, sequenceSpeed);
            }
            /* If the sequence is complete, wait the programmed amount of
            time, then remove the .on class from all pads, clear out the gameData.match
            array and capture the response. */
            else {
                setTimeout(function(){
                    for( const eachPad of pads ){
                        eachPad.removeAttribute('class');
                    }
                    gameData1.match = [];

                    captureResponse1();
                }, sequenceSpeed);
                console.log('gameData1.sequence ' + gameData1.sequence);
            }
        }, 500);
    }
    function callSequence2(sequenceLength, sequenceSpeed){
        pads2 = document.querySelectorAll('#game2 div');
        setTimeout( function(){
            for( const eachPad of pads2 ){
                eachPad.removeAttribute('class');
            }
            const num = Math.floor(Math.random()*4)+11;
            gameData2.sequence.push(num);
            document.querySelector(`#pad${num}`).className = 'on';
            counter2++;
            /* If the sequence is not finishd, run the function again and
            animate the next pad in the sequence */ 
            if(counter2 < sequenceLength){
                /* this settimeOut runs for different lengths of time,
                as determined by the program. As the game continues the wait time 
                is shorter and shorter*/
                setTimeout(function(){
                    for( const eachPad of pads2 ){
                        eachPad.removeAttribute('class');
                    }
                    callSequence2(sequenceLength, sequenceSpeed);
                }, sequenceSpeed);
            }

            /* If the sequence is complete, wait the programmed amount of
            time, then remove the .on class from all pads, clear out the gameData.match
            array and capture the response. */
            else {
                setTimeout(function(){
                    for( const eachPad of pads2 ){
                        eachPad.removeAttribute('class');
                    }
                    gameData2.match = [];

                    captureResponse2();
                }, sequenceSpeed);
                console.log('gameData2.sequence ' + gameData2.sequence);
            }
        }, 500);
    }

    /* This is the function that captures responses from the user, and
    checks to see if they have pressed the pads in the correct order. */
    function captureResponse1(){
        action.innerHTML = '';
        /* The status variable is used to check the status of the game. Should it
        continue, or should it end because the player got the pattern wrong? */
        // from glenda: declared "let" for status as global.
        p1Status = 0;
        // from glenda, empty array
        gameData1.match = [];
    }
    function captureResponse2(){
        action.innerHTML = '';
        p2Status = 0;
        // from glenda, empty array
        gameData2.match = [];
    }

    // from glenda: updated to named function and moved out of the captureResponse function
    
    document.addEventListener('keydown', checkKey);

    // this is how to remove an event listener:
    // document.removeEventListener('keydown', checkKey);
    
    function checkKey(event){
        console.log(event.key);
        let id = '';

        if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
            if (event.key === 'w') {
                id = 'pad1';
            } else 
            if (event.key === 'a') {
                id = 'pad2';
            } else 
            if (event.key === 's') {
                id = 'pad3';
            } else 
            if (event.key === 'd') {
                id = 'pad4';
            }

            /* The following line pulls out the number at the end of the ID for the
            pad that was clicked (charAt()), converts it into an integer (parseInt()) 
            Then pushes it into the gameData.match array (push())*/
            gameData1.match.push(parseInt(id.charAt(3)));

        } else  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            let id = '';

            if (event.key === 'ArrowUp') {
                id = 'pad11';
            } else 
            if (event.key === 'ArrowLeft') {
                id = 'pad12';
            } else 
            if (event.key === 'ArrowDown') {
                id = 'pad13';
            } else 
            if (event.key === 'ArrowRight') {
                id = 'pad14';
            } 

            /* The following line pulls out the number at the end of the ID for the
            pad that was clicked (charAt()), converts it into an integer (parseInt()) 
            Then pushes it into the gameData.match array (push())*/
            gameData2.match.push(parseInt(id.charAt(4))+10);
        }

        /* This if statement checks to see if the length of the two
        arrays is the same */ 
        if( gameData1.match.length == gameData1.sequence.length){
            console.log(gameData1.match);
            /* This loops through the match array and checks
            to see if each element matches the corresponding element in the 
            sequence array. */
            for( let i=0; i<gameData1.match.length; i++){
                /* if any of the elements in the array do not match, then status
                is set to zero and the player loses the game */
                if( gameData1.match[i] != gameData1.sequence[i]){
                    showCurrentScore();
                    nextSequence();
                    setTimeout(300);
                    // Things we tried and good to remember
                    // p1Status = 0;
                    // gameData1.sequence = [];
                    // console.log(`${gameData1.sequence}`);
                    // counter = 0;
                    // callSequence1(gameData1.count, gameData1.speed);
                }
                /* If none of the matches in the loop trigger an error, status
                is set to 1 and that value will be used to continue the game */
                else {
                    p1Status = 1;
                }
            }
        //this only runs if the game continues...
        if(p1Status){
            /* settimeOut is used here just to provide a little time for the game to continue.SetupNextRound sets up the game for the next sequence*/
            setTimeout(setupNextRound, 400);

            }
        }

        /* This if statement checks to see if the length of the two
        arrays is the same */ 
        if( gameData2.match.length == gameData2.sequence.length){
            console.log(gameData2.match);
            /* This loops through the match array and checks
            to see if each element matches the corresponding element in the 
            sequence array. */
            for( let i=0; i<gameData2.match.length; i++){
                /* if any of the elements in the array do not match, then status
                is set to zero and the player loses the game */
                if( gameData2.match[i] != gameData2.sequence[i]){
                    showCurrentScore();
                    nextSequence2();
                    setTimeout(300);

                }
                /* If none of the matches in the loop trigger an error, status
                is set to 1 and that value will be used to continue the game */
                else {
                    p2Status = 1;
                }
            }
        //this only runs if the game continues...
        if(p2Status){
            /* settimeOut is used here just to provide a little time for the game to continue.SetupNextRound sets up the game for the next sequence*/
            setTimeout(setupNextRound2, 400);
            }
        }

    };

    function setupNextRound(){
        //reset the counter for the next sequence
        counter = 0;
        // update the score
        gameData1.score = gameData1.score + gameData1.count*5;

        // roll dice here as reward
        throwDice();

        /* the increment variable is used to determine how many rounds have each count.
        Currently, the game is set to three rounds of three pads, three rounds of four pads, etc. */
        gameData1.increment = gameData1.increment -1;
        // clear out the sequence array. The match one is cleared out at the end of the sequence.
        gameData1.sequence = [];
        // from glenda: reset the match array
        gameData1.match = [];
        console.log (gameData1.match);
        // set the new score
        currentScore.innerHTML = gameData1.score;
        /* This replaces all the pads with new ones. This is necessary otherwise the old pads will
        get additional event listeners added to them in the captureResponse() function. There is the added
        benefit of not having event listeners on the pads during the callSequence phase of the game. */
        game1.innerHTML = '<div id="pad1"> <p>W</p> <svg xmlns="http://www.w3.org/2000/svg" width="60" height="44" viewBox="0 0 60 44" fill="none"><path d="M0 44L30 0L60 44H0Z"/></svg></div>             <div id="pad2"> <p>A</p> <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M52 0L52 60L8 30L52 0Z"/></svg></div>             <div id="pad3"> <p>S</p> <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M0 8H60L30 52L0 8Z"/></svg></div>             <div id="pad4"> <p>D</p> <svg xmlns="http://www.w3.org/2000/svg" width="44" height="60" viewBox="0 0 44 60" fill="none"><path d="M0 60L-2.62268e-06 0L44 30L0 60Z"/></svg></div>';

    }

    function setupNextRound2(){
        //reset the counter for the next sequence
        counter2 = 0;
        // update the score
        gameData2.score = gameData2.score + gameData2.count*5;

        // add roll dice here as a reward
        throwDice2();

        /* the increment variable is used to determine how many rounds have each count.
        Currently, the game is set to three rounds of three pads, three rounds of four pads, etc. */
        gameData2.increment = gameData2.increment -1;
        // clear out the sequence array. The match one is cleared out at the end of the sequence.
        gameData2.sequence = [];
        // from glenda: reset the match array
        gameData2.match = [];
        console.log (gameData2.match);
        // set the new score
        currentScore.innerHTML = gameData2.score;
        /* This replaces all the pads with new ones. This is necessary otherwise the old pads will
        get additional event listeners added to them in the captureResponse() function. There is the added
        benefit of not having event listeners on the pads during the callSequence phase of the game. */
        game2.innerHTML = '<div id="pad11"> <p>up</p> <svg xmlns="http://www.w3.org/2000/svg" width="60" height="44" viewBox="0 0 60 44" fill="none"><path d="M0 44L30 0L60 44H0Z"/></svg></div>             <div id="pad12"> <p>left</p> <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M52 0L52 60L8 30L52 0Z"/></svg></div>             <div id="pad13"> <p>down</p> <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M0 8H60L30 52L0 8Z"/></svg></div>             <div id="pad14"> <p>right</p> <svg xmlns="http://www.w3.org/2000/svg" width="44" height="60" viewBox="0 0 44 60" fill="none"><path d="M0 60L-2.62268e-06 0L44 30L0 60Z"/></svg></div>';
    }

// Dice stuff
    const gameDice = document.querySelector('#game-dice1');
    const gameDice2 = document.querySelector('#game-dice2');
    const score = document.querySelector('#score');

    const gameDataDice = {
        dice: ['1die.svg', '2die.svg', '3die.svg', 
               '4die.svg', '5die.svg', '6die.svg'],
        players: ['P1', 'P2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };
    const gameDataDice2 = {
        dice: ['1die.svg', '2die.svg', '3die.svg', 
               '4die.svg', '5die.svg', '6die.svg'],
        players: ['P1', 'P2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    const diceSound = new Audio('sounds/dice.wav');
    // throw dice ok
    function throwDice() {
        diceSound.play();
        gameDice.innerHTML = '';
        gameDataDice.roll1 = Math.floor(Math.random() * 6) + 1;
        gameDataDice.roll2 = Math.floor(Math.random() * 6) + 1;
        // console.log(gameDataDice.roll1);
        // console.log(gameDataDice.roll2);
        gameDice.innerHTML += `<img class="roll1" src="images/${gameDataDice.dice[gameDataDice.roll1-1]}"> <img class="roll2" src="images/${gameDataDice.dice[gameDataDice.roll2-1]}">`
        gameDataDice.rollSum = gameDataDice.roll1 + gameDataDice.roll2;
        // console.log(gameDataDice.rollSum);

        // for testing purposes
        // gameDataDice.rollSum = 2;
        // gameDataDice.roll1 = 1;
        // gameDataDice.roll2 = 1;

        // if two 1's are rolled
        if (gameDataDice.rollSum === 2){
            // zero out the score for both players
            gameDataDice.score[gameDataDice.index] = 0;
            cherryBomb();

            // wait 2 seconds
            setTimeout(2000);
        }

        // if either die is a 1
        else if (gameDataDice.roll1 === 1 || gameDataDice.roll2 === 1){
            p1Boom();

            // wait 2 seconds
            setTimeout(2000);
        }

        // if neighther is a 1
        else {
            // update score
            gameDataDice.score[gameDataDice.index] = gameDataDice.score[gameDataDice.index] + gameDataDice.rollSum;

        }

        checkWinningCondition();
    }
    
    function throwDice2() {
        diceSound.play();
        gameDice2.innerHTML = '';
        gameDataDice2.roll1 = Math.floor(Math.random() * 6) + 1;
        gameDataDice2.roll2 = Math.floor(Math.random() * 6) + 1;
        // console.log(gameDataDice2.roll1);
        // console.log(gameDataDice2.roll2);
        gameDice2.innerHTML += `<img class="roll11" src="images/${gameDataDice2.dice[gameDataDice2.roll1-1]}"> <img class="roll12" src="images/${gameDataDice2.dice[gameDataDice2.roll2-1]}">`
        gameDataDice2.rollSum = gameDataDice2.roll1 + gameDataDice2.roll2;
        // console.log(gameDataDice.rollSum);

        // for testing purposes
        // gameDataDice2.rollSum = 2;
        // gameDataDice2.roll1 = 1;
        // gameDataDice2.roll2 = 1;

        // if two 1's are rolled
        if (gameDataDice2.rollSum === 2){
            // zero out the score for both players
            gameDataDice2.score[gameDataDice2.index] = 0;
            cherryBomb();

            // wait 2 seconds
            setTimeout(2000);
        }

        // if either die is a 1
        else if (gameDataDice2.roll1 === 1 || gameDataDice2.roll2 === 1){
            p2Boom();
            // wait 2 seconds
            setTimeout(2000);
        }

        // if neighther is a 1
        else {
            // update score
            gameDataDice2.score[gameDataDice2.index] = gameDataDice2.score[gameDataDice2.index] + gameDataDice2.rollSum;
        }

        checkWinningCondition2();
    }

// Boom & cherry bomb effect
    function p1Boom(){
        document.querySelector(".p1boom").style.display = 'block';
        setTimeout(function(){
            document.querySelector(".p1boom").style.display = 'none';
        }, 500);
    }

    function p2Boom(){
        document.querySelector(".p2boom").style.display = 'block';
        setTimeout(function(){
            document.querySelector(".p2boom").style.display = 'none';
        }, 500);
    }

    function cherryBomb(){
        // Setting all scores to 0
        gameData1.score = 0;
        gameData2.score = 0;
        gameDataDice.score = [0, 0];
        gameDataDice2.score = [0, 0];
        document.querySelector(".cherry-bomb").style.display = 'block';
        setTimeout(function(){
            document.querySelector(".cherry-bomb").style.display = 'none';
        }, 700);
    }
    
    const winSound = new Audio('sounds/win.wav');
    // check win ok
    function checkWinningCondition(){
        if(gameDataDice.score[gameDataDice.index] > gameDataDice.gameEnd){
            winSound.play();
            score.innerHTML = `<h2>P1 wins with ${gameDataDice.score[gameDataDice.index]} points!</h2>`; 
            message.innerHTML += '<p id="quit">Start a New Game?</p>';
            document.querySelector('#quit').addEventListener('click', function(){
                window.location.reload();
            })
        } else {
            // show current score function here
            showCurrentScore();
            nextSequence();
            setTimeout(300);
        }
    }
    function checkWinningCondition2(){
        if(gameDataDice2.score[gameDataDice2.index] > gameDataDice2.gameEnd){
            winSound.play();
            score.innerHTML = `<h2>P2 wins with ${gameDataDice2.score[gameDataDice2.index]} points!</h2>`; 
            message.innerHTML += '<p id="quit">Start a New Game?</p>';
            document.querySelector('#quit').addEventListener('click', function(){
                window.location.reload();
            })
        } else {
            // show current score function here
            showCurrentScore();
            nextSequence2();
            setTimeout(300);
        }
    }

    function showCurrentScore() {
        score.innerHTML = `<p class="p1score">${gameDataDice.players[0]} SCORE<br><strong>
        ${gameDataDice.score[0]}</strong></p>`;
        score.innerHTML += '<p class="caption">vs</p>';
        score.innerHTML += `<p class="p2score">${gameDataDice2.players[1]} SCORE<br><strong>
        ${gameDataDice2.score[0]}</strong></p>`;
    }

})();