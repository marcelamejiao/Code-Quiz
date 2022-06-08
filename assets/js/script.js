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

        li.addEventListener("click", function(event){
            var selectedAnswer = event.target;
            if (selectedAnswer.textContent === currentQuestion.correctAnswer) {
                document.querySelector("#quiz .card-footer").textContent = "correct";
                if (questionNumber === quiz.questions.length - 1){
                    document.querySelector("#quiz").style.display = "none";
                    document.querySelector("#final-screen").style.display = "block";
                    
                    return;
                }
                questionNumber++
                renderQuestionsAndAnswers(questionNumber);
            }
            else {
                document.querySelector("#quiz .card-footer").textContent = "incorrect";
            }

        });
    }
}

function getHighScores () {
    highScores = JSON.parse(localStorage.getItem("highScores"));
}

function setHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

var finalScore = 100;

document.querySelector("#finalButton").addEventListener("click", function(){
    highScores.push({
        initials: document.querySelector("input").value,
        finalScore: finalScore
    });

    setHighScores();
console.log(highScores);
});

document.querySelector("#startButton").addEventListener("click", function(){
    document.querySelector("#quiz").style.display = "block";
    document.querySelector("#start").style.display = "none";
});

function initialise () {
    getHighScores();

    renderQuestionsAndAnswers(questionNumber);
}

initialise();