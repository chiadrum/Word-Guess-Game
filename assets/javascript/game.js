// Reference to DOM elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

// Create variables for game (words,wins losses, picked word, guesses left, word //placeholder, guessed letter bank, incorrect letter bank)
var wordBank = ['Incubus', ' Iron Maiden', ' Black Sabbath', 'Fishbone', 'Dumpstaphunk', 'Wonder', 'Charles', 'Rebirth', 'Soundgarden'];
var wins = 0;
var losses = 0;
var guessesLeft = 0;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank; [];

// New game function. Pick new word, create placeholders
function newGame () {
    // reset game info
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    // pick new word, the math returns a number based on the index for placeholder reference
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log(pickedWord);

        // create placeholders from new picked word
        for (var i = 0; i < pickedWord.length; i++){
            if (pickedWord[i] === ' ') {
                pickedWordPlaceholderArr.push(' '); //if empty space creates empty spaces for user guess-valid only for multiple word choices
            } else {
                pickedWordPlaceholderArr.push('_');// denotes space for a letter
            }
        }

        //write game info to DOM
        $guessesLeft.textContent = guessesLeft;
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        $guessedLetters.textContent = incorrectLetterBank;
};


    


// Letter guess function. Check letter selected to word
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning && guessedLetterBank.indexOf(letter) === -1) {
        console.log("check")
        //-1 means doesn't exist, have not guessed, run game logic
        guessedLetterBank.push(letter);
        //check if guessed letter is in picked word
        for (var i = 0; i < pickedWord.length; i++) {
            console.log(pickedWord[i])
            // Convert both values to lower case for correct comparison.
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                console.log("success");
                //if a match, swap out the character in the placeholder with the act letter
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }

        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        checkIncorrect(letter);
    }
    else {
        if (!gameRunning) {
            alert("The game isn't running, click the New Game button to start over.");
        } else {
            alert("You've already guessed this letter, try a new one!");
        }
    }
    checkLoss(); //function call
    checkWin(); //function call
}
// Check for Incorrect
    function checkIncorrect (letter) {
// Check to see if letter didn't make it to pickWord, bad guess         
        if    (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && 
            pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        // Decrease guesses
            guessesLeft--;
        // Add incorrect letter to incorrect letter bank
            incorrectLetterBank.push(letter);
        // Write new bank of bad guesses to DOM
            $guessedLetters.textContent = incorrectLetterBank.join(' ');
        // Write new amount of guesses left to DOM    
            $guessesLeft.textContent = guessesLeft;
        }
    }
// Check Lose
    function checkLoss () {
        if (guessesLeft === 0) {
            losses++;
            gameRunning = false;
            $losses.textContent = losses; //write to DOM
            $placeholders.textContent = pickedWord;
        }
         
    } 
        
        newGame();

// Check Win
    function checkWin () {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins; //write to DOM
    }
        
    } 
    
         
        newGame();
// Add event listener for new game button
$newGameButton.addEventListener('click', newGame);
// Add onkey up event to trigger 
document.onkeyup = function(event) {
    console.dir(event); // for debugging
    // if (event.keycode >= 65 && event.keycode <= 90)//represents the alphabet a-z 
    // {
        letterGuess(event.key); // the actual letter
    // }
}