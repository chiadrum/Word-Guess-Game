var selectableWords =           // Word list
    [
        "csharp",
        "cplusplus",
        "rubyonrails",
        "python",
        "javascript",
        "ansic",
        "cobol",
        "fortran",
        "visualbasic",
        "compiler",
        "algorithm",
    ];

const maxTries = 8;            // Maximum number of tries player has
// Reference to DOM elements
var $newGameButton = document.getElementById('start');
var $placeholders = document.getElementById('currentWord');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('remainingGuesses');
var $wins = document.getElementById('totalWins');

