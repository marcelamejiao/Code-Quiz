var quiz = {
    questions: [
        {
            questionHeading: "Test question 1?",
            availableAnswers: ["2", '6', '15', '105'],
            correctAnswer: "15"
        },
        {
            questionHeading: "Test question 2?",
            availableAnswers: ["25", '65', '155', '1055'],
            correctAnswer: "25"
        }
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

                // ... hide the correct message after 1 second
                var correctAnswerInterval = setInterval(function () {
                    document.querySelector("#quiz .card-footer").textContent = "";

                    clearInterval(correctAnswerInterval);
                }, 1000);

                // ... if it is the last question ...
                if (questionNumber === quiz.questions.length - 1){
                    // shows the final screen.
                    document.querySelector("#quiz").style.display = "none";
                    document.querySelector("#final-screen").style.display = "block";

                    // Stop timer
                    clearInterval(timerInterval);
                    
                    return;
                }
                // show the next question.
                questionNumber++;
                renderQuestionsAndAnswers(questionNumber);
            }
            // shows it is incorrect
            else {
                document.querySelector("#quiz .card-footer").textContent = "incorrect";

                // Decrease score when answer is wrong
                finalScore = finalScore - 10;
            }

        });
    }
}

// Get the highscores from local storage and convert to JS
function getHighScores () {
    highScores = JSON.parse(localStorage.getItem("highScores"));
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
    timer.textContent = finalScore;

    var displayFinalScore = document.querySelector("#final-score");
    displayFinalScore.textContent = finalScore;
}

// When user press Submit then store the highscores
document.querySelector("#finalButton").addEventListener("click", function(){
    highScores.push({
        initials: document.querySelector("input").value,
        finalScore: finalScore
    });

    setHighScores();

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
    document.querySelector("#highscores").style.display = "block";
    document.querySelector("#start").style.display = "none";
    document.querySelector("#final-screen").style.display = "none";

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
    finalScore = "";
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