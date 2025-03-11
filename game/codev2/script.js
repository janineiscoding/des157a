(function(){
    'use strict';
    console.log('reading JS');

    // variables for interface elements
    const bttn = document.querySelector('#action a');
    const game = document.querySelector('#game');
    const message = document.querySelector('.score-box #message');
    const action = document.querySelector('#action');
    const currentScore = document.querySelector('#score span');
    /* The variable below uses let because these elements are going to be
    removed from the page and added back in, so that event listeners can be
    removed and added back on to them. */
    let pads = document.querySelectorAll('#game div');
    //counter is used to determine if we are done with the sequence
    let counter = 0;
    let status = 0;

    // object keeps track of data within the game
    const gameData = {
        count: 3,
        increment: 3,
        score: 0,
        speed: 500,
        sequence: [0, 0, 0],
        match: [1, 1, 1]
    }

    // Gets the game started
    bttn.addEventListener('click', function(event){
        event.preventDefault();
        gameData.sequence = [];
        // glenda added to reset the match array
        gameData.match = [];
        // console.log(gameData.match);
        callSequence(gameData.count, gameData.speed);
        // from glenda: once the game play is started I think the instructions and button should be removed because they get in the way of focusing on the sequence
        message.innerHTML = '';
        bttn.innerHTML = 'Match the pattern';
    });

    // A recursive function for creating the call sequence
    function callSequence(sequenceLength, sequenceSpeed){
        /* reassigning padds because after the first round they will be
        removed from the DOM and re-added in the setupNextRound function */
        pads = document.querySelectorAll('#game div');
        // This settimeOut is set for 600ms so the animation on the pad can finish.
        setTimeout( function(){
            //removes the .on class which has the animation for all the pads
            for( const eachPad of pads ){
                eachPad.removeAttribute('class');
            }
            // generate a random number between 1 & 4...
            const num = Math.floor(Math.random()*4)+1;
            // push the random number in the gameData.sequence object
            gameData.sequence.push(num);
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
                    callSequence(sequenceLength, sequenceSpeed);
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
                    gameData.match = [];

                    captureResponse();
                }, sequenceSpeed);
                console.log(gameData.sequence);
            }
       }, 600);
    }

    /* This is the function that captures responses from the user, and
    checks to see if they have pressed the pads in the correct order. */
    function captureResponse(){
        action.innerHTML = '';
        // message.innerHTML = 'Can you match the pattern?'
        /* The status variable is used to check the status of the game. Should it
        continue, or should it end because the player got the pattern wrong? */
        // from glenda: declared "let" for status as global.
        status = 0;
        // from glenda, empty array
        gameData.match = [];
        // console.log(gameData.match);
    }

    // from glenda: updated to named function and moved out of the captureResponse function
    document.addEventListener('keydown', checkKey);

    // this is how to remove an event listener:
    // document.removeEventListener('keydown', checkKey);
    
    function checkKey(event){
        let id = '';
        if (event.key === 'w') {
            // console.log('w key');
            id = 'pad1';
        } else 
        if (event.key === 'a') {
            // console.log('a key');
            id = 'pad2';
        } else 
        if (event.key === 's') {
            // console.log('s key');
            id = 'pad3';
        } else 
        if (event.key === 'd') {
            // console.log('d key');
            id = 'pad4';
        }

        /* The following line pulls out the number at the end of the ID for the
        pad that was clicked (charAt()), converts it into an integer (parseInt()) 
        Then pushes it into the gameData.match array (push())*/
        gameData.match.push(parseInt(id.charAt(3)));

        /* This if statement checks to see if the length of the two
        arrays is the same */ 
        if( gameData.match.length == gameData.sequence.length){
            console.log(gameData.match);
            /* This loops through the match array and checks
            to see if each element matches the corresponding element in the 
            sequence array. */
            for( let i=0; i<gameData.match.length; i++){
                /* if any of the elements in the array do not match, then status
                is set to zero and the player loses the game */
                if( gameData.match[i] != gameData.sequence[i]){
                    status = 0;
                    message.innerHTML = "Sorry you lose. Better luck next time!";
                }
                /* If none of the matches in the loop trigger an error, status
                is set to 1 and that value will be used to continue the game */
                else {
                    status = 1;
                }
            }
        //this only runs if the game continues...
        if(status){
            /* settimeOut is used here just to provide a little time for the game to continue.SetupNextRound sets up the game for the next sequence*/
            setTimeout(setupNextRound, 400);
            }
        }
    };

    /* This function sets up the game for the next sequence and updates the game variables
    and interface. */
    function setupNextRound(){
        
        //reset the counter for the next sequence
        counter = 0;
        // update the score
        gameData.score = gameData.score + gameData.count*5;

        // add roll dice here as a reward
        throwDice();

        /* the increment variable is used to determine how many rounds have each count.
        Currently, the game is set to three rounds of three pads, three rounds of four pads, etc. */
        gameData.increment = gameData.increment -1;
        // clear out the sequence array. The match one is cleared out at the end of the sequence.
        gameData.sequence = [];
        // from glenda: reset the match array
        gameData.match = [];
        console.log (gameData.match);
        // set the new score
        currentScore.innerHTML = gameData.score;
        // message.innerHTML = "Great job! You got that one ready for the next one?";
        action.innerHTML = '<a href="#">Start Next Round</a>';
        /* This replaces all the pads with new ones. This is necessary otherwise the old pads will
        get additional event listeners added to them in the captureResponse() function. There is the added
        benefit of not having event listeners on the pads during the callSequence phase of the game. */
        game.innerHTML = '<div id="pad1"> <p>W</p> <svg xmlns="http://www.w3.org/2000/svg" width="60" height="44" viewBox="0 0 60 44" fill="none"><path d="M0 44L30 0L60 44H0Z"/></svg></div>             <div id="pad2"> <p>A</p> <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M52 0L52 60L8 30L52 0Z"/></svg></div>             <div id="pad3"> <p>S</p> <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><path d="M0 8H60L30 52L0 8Z"/></svg></div>             <div id="pad4"> <p>D</p> <svg xmlns="http://www.w3.org/2000/svg" width="44" height="60" viewBox="0 0 44 60" fill="none"><path d="M0 60L-2.62268e-06 0L44 30L0 60Z"/></svg></div>';

        /* This event listener kicks off the start of the next callSequence function and continues 
        the game. */
        document.querySelector('#action a').addEventListener('click', function(event){
            event.preventDefault();
            // glenda added: clear the gameDice
            gameDice.innerHTML = '';
            // glenda moved this from the timeout to happen immediately so player could focus on the sequence (you can put it back in the Timeout if you prefer)
            message.innerHTML = '';
            action.innerHTML = '';
            callSequence(gameData.count, gameData.speed);

            // glenda commented out the Timeout
            // setTimeout(function(){
                
            // }, 1000);
        } );
    }

// Dice stuff
    const gameDice = document.querySelector('#game-dice');
    const score = document.querySelector('#score');
    const actionArea = document.querySelector('#actions');    

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

    function throwDice() {
        actionArea.innerHTML = '';
        gameDice.innerHTML = '';
        gameDataDice.roll1 = Math.floor(Math.random() * 6) + 1;
        gameDataDice.roll2 = Math.floor(Math.random() * 6) + 1;
        console.log(gameDataDice.roll1);
        console.log(gameDataDice.roll2);
        gameDice.innerHTML += `<img src="images/${gameDataDice.dice[gameDataDice.roll1-1]}"> <img src="images/${gameDataDice.dice[gameDataDice.roll2-1]}">`
        gameDataDice.rollSum = gameDataDice.roll1 + gameDataDice.roll2;
        // console.log(gameDataDice.rollSum);

        // for testing purposes
        // gameDataDice.rollSum = 2;
        // gameDataDice.roll1 = 1;
        // gameDataDice.roll2 = 1;

        // if two 1's are rolled
        if (gameDataDice.rollSum === 2){
            // console.log('snake eyes!');
            gameDice.innerHTML += '<p>Oh snap! Snake eyes!</p>';
            // zero out the score
            gameDataDice.score[gameDataDice.index] = 0;
            // switch player using tenary operator
            gameDataDice.index ? (gameDataDice.index = 0) : (gameDataDice.index = 1);
            // we will add showCurrentScore() function here

            // wait 2 seconds
            setTimeout(2000);
        }

        // if either die is a 1
        else if (gameDataDice.roll1 === 1 || gameDataDice.roll2 === 1){
            console.log('one of the two dice rolled is a 1');
            gameDataDice.index ? (gameDataDice.index = 0) : (gameDataDice.index = 1);
            gameDice.innerHTML += `<p>Sorry, one of you rolls was a one, switching to ${gameDataDice.players[gameDataDice.index = 1]}</p>`;
            game.innerHTML += '<img class="p1boom" src="images/boom.svg" alt="boom">'

            // wait 2 seconds
            setTimeout(2000);
        }

        // if neighther is a 1
        else {
            console.log('neither dice was a 1, game continues');
            // update score
            gameDataDice.score[gameDataDice.index] = gameDataDice.score[gameDataDice.index] + gameDataDice.rollSum;

        }

        checkWinningCondition();
    }

    function checkWinningCondition(){
        if(gameDataDice.score[gameDataDice.index] > gameDataDice.gameEnd){
            score.innerHTML = `<h2>${gameDataDice.players[gameDataDice.index]} wins with ${gameDataDice.score[gameDataDice.index]} points!</h2>`; 
            actionArea.innerHTML = '';
            document.querySelector('#quit').innerHTML = 'Start a New Game?';
        } else {
            // show current score function here
            showCurrentScore();
        }
    }

    function showCurrentScore() {
        // score.innerHTML = `The score is curretly <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.player[1]} ${gameData.score[1]}</strong></p>`;
        score.innerHTML = `<p class="p1score">${gameDataDice.players[0]} SCORE<br><strong>
        ${gameDataDice.score[0]}</strong></p>`;
        score.innerHTML += '<p class="caption">vs</p>';
        score.innerHTML += `<p class="p2score">${gameDataDice.players[1]} SCORE<br><strong>
        ${gameDataDice.score[1]}</strong></p>`;
    }

})();