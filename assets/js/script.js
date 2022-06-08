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
                // ... if it is the last question ...
                if (questionNumber === quiz.questions.length - 1){
                    // shows the final screen.
                    document.querySelector("#quiz").style.display = "none";
                    document.querySelector("#final-screen").style.display = "block";
                    
                    return;
                }
                // show the next question.
                questionNumber++;
                renderQuestionsAndAnswers(questionNumber);
            }
            // shows it is incorrect
            else {
                document.querySelector("#quiz .card-footer").textContent = "incorrect";
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

var finalScore = 100;

// When user press Submit then store the highscores
document.querySelector("#finalButton").addEventListener("click", function(){
    highScores.push({
        initials: document.querySelector("input").value,
        finalScore: finalScore
    });

    setHighScores();
console.log(highScores);
});

// When user press start show questions
document.querySelector("#startButton").addEventListener("click", function(){
    document.querySelector("#quiz").style.display = "block";
    document.querySelector("#start").style.display = "none";
});

// When user press View highscores then show highscores list
document.querySelector("#highscoresButton").addEventListener("click", function(){
    document.querySelector("#highscores").style.display = "block";
    document.querySelector("#start").style.display = "none";
    // document.querySelector("#quiz").style.display = "none";
});

function initialise () {
    getHighScores();

    renderQuestionsAndAnswers(questionNumber);
}

initialise();