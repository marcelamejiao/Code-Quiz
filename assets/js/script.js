var quiz = {
    questions: [
        {
            questionHeading: "Commonly used data types DO NOT include",
            availableAnswers: ["strings", 'booleans', 'alerts', 'numbers'],
            correctAnswer: "alerts"
        },
        {
            questionHeading: "The condition on an if / else statement is enclosed within ___.?",
            availableAnswers: ["quotes", 'curly brackets', 'parentheses', 'square brackets'],
            correctAnswer: "parentheses"
        },
        {
            questionHeading: "Arrays in JavaScript can be used to store ___.?",
            availableAnswers: ["numbers and strings", 'other arrays', 'booleans', 'all of the above'],
            correctAnswer: "all of the above"
        },
        {
            questionHeading: "String values must be enclosed within ___ when being assigned to variables.",
            availableAnswers: ["commas", 'curly brackets', 'quotes', 'parentheses'],
            correctAnswer: "quotes"
        },
        {
            questionHeading: "A very useful tool used during development and debugging for printing content to the debugger is?",
            availableAnswers: ["JavaScript", 'terminal/bash', 'for loops', 'console.log'],
            correctAnswer: "console.log"
        },
    ]
};

var highScores = [];
var questionNumber = 0;
var finalScore;
var timerInterval;

function renderQuestionsAndAnswers(index)
{
    var questionDisplay = document.querySelector('#question');
    var answerDisplay = document.querySelector('#answers');
    var currentQuestion = quiz.questions[index];

    questionDisplay.textContent = currentQuestion.questionHeading;

    // Clear answerDisplay element 
    answerDisplay.innerHTML = "";
 
    // Render a new li for each answer
    for (var i = 0; i < currentQuestion.availableAnswers.length; i++) {
        var answer = currentQuestion.availableAnswers[i];

        var li = document.createElement("li");
        li.textContent = answer;


        answerDisplay.appendChild(li);

        // When the user clicks an answer...
        li.addEventListener("click", function(event){
            var selectedAnswer = event.target;
            // ... if the answer was correct ...
            if (selectedAnswer.textContent === currentQuestion.correctAnswer) {
                // ... shows it is correct ...
                document.querySelector("#quiz .card-footer").textContent = "correct";
            }
            // ...otherwise shows it is incorrect.
            else {
                document.querySelector("#quiz .card-footer").textContent = "incorrect";

                // Decrease score when answer is wrong
                finalScore = finalScore - 10;
            }

            // Hide the message after 1 second
            var correctAnswerInterval = setInterval(function () {
                document.querySelector("#quiz .card-footer").textContent = "";

                clearInterval(correctAnswerInterval);
            }, 1000);

            // If it is the last question ...
            if (questionNumber === quiz.questions.length - 1){
                // shows the final screen.
                document.querySelector("#quiz").style.display = "none";
                document.querySelector("#final-screen").style.display = "block";

                // Stop timer
                clearInterval(timerInterval);
                
                return;
            }

            // otherwise show the next question.
            questionNumber++;
            renderQuestionsAndAnswers(questionNumber);
        });
    }
}

// Get the highscores from local storage and convert to JS
function getHighScores () {
    highScores = JSON.parse(localStorage.getItem("highScores"));

    // If this is the first time the page is loading, start with an empty array
    if (highScores === null){
        highScores = [];
    }
}

// Get the high scores array and set it in local storage as text
function setHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Clear the highscores
function clearHighscores () {
    highScores = [];

    setHighScores();
}

// Update the highscores list
function renderHighscores(){
    var list = document.querySelector("#highscores .card-body ol");
    list.innerHTML = "";

    for (var i = 0; i<highScores.length; i++){
        var currentHighscore = highScores[i];

        var li = document.createElement("li");
        li.textContent = currentHighscore.initials+ " - " + currentHighscore.finalScore;
        
        list.appendChild(li);
    }
    
}

// Render time/score 
function renderScore(){
    var timer = document.querySelector("#timer");

    if (finalScore === 0) {
        timer.classList.remove('filled');
        timer.textContent = '';
    } else {
        timer.classList.add('filled');
        timer.textContent = finalScore;
    }

    var displayFinalScore = document.querySelector("#final-score");
    displayFinalScore.textContent = finalScore;
}

// When user press Submit then store the highscores
document.querySelector("#finalButton").addEventListener("click", function(){
    var initials = document.querySelector("input").value;

    if (! initials) {
        window.alert('Please fill in initials.');
        return;
    }

    // Add the highscore to our list
    highScores.push({
        initials: document.querySelector("input").value,
        finalScore: finalScore
    });

    // Sort the highscores by their finalScore value
    highScores.sort(function (highScoreA, highScoreB) {
        return highScoreB.finalScore - highScoreA.finalScore;
    });

    setHighScores();

    // Clear the score once the player has finished the quiz.
    finalScore = 0;
    renderScore();

    document.querySelector("#final-screen").style.display = "none";
    document.querySelector("#highscores").style.display = "block";

    renderHighscores();
});

// When user press start show questions
document.querySelector("#startButton").addEventListener("click", function(){
    document.querySelector("#quiz").style.display = "block";
    document.querySelector("#start").style.display = "none";

    finalScore = 90;
    renderScore();

    // Start the countdown timer.
    timerInterval = setInterval(function(){
        finalScore--;

        renderScore();

        if (finalScore<=0){
            clearInterval(timerInterval);

            if (finalScore < 0){
                finalScore = 0;
                renderScore();
            }

            document.querySelector("#quiz").style.display = "none";
            document.querySelector("#final-screen").style.display = "block";
        }
    },1000);
});

// When user press View highscores then show highscores list
document.querySelector("#highscoresButton").addEventListener("click", function(){
    // The user must finish the quiz before seeing highscores
    if (finalScore > 0){
        window.alert("Please finish the Quiz to see the highscores.");
        return;
    }

    document.querySelector("#highscores").style.display = "block";
    document.querySelector("#start").style.display = "none";
    document.querySelector("#final-screen").style.display = "none";
    document.querySelector("#quiz").style.display = "none";

    renderHighscores();
});

// When user press Clear highscores then empty the list
document.querySelector("#clear-button").addEventListener("click", function(){
    clearHighscores();
    renderHighscores();
});

// When user press Go back it shows the start section
document.querySelector("#go-back").addEventListener("click", function(){
    questionNumber = 0;
    finalScore = 0;
    renderScore();

    renderQuestionsAndAnswers(questionNumber);

    document.querySelector("#highscores").style.display = "none";
    document.querySelector("#start").style.display = "block";
});

function initialise () {
    getHighScores();

    renderQuestionsAndAnswers(questionNumber);
}

initialise();