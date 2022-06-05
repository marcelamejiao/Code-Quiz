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

var questionNumber = 0;

renderQuestionsAndAnswers(questionNumber);

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
        // li.setAttribute("data-index", i);

        answerDisplay.appendChild(li);

        li.addEventListener("click", function(event){
            var selectedAnswer = event.target;
            if (selectedAnswer.textContent === currentQuestion.correctAnswer) {
                document.querySelector(".card-footer").textContent = "correct";
                if (questionNumber === quiz.questions.length - 1){
                    document.querySelector(".card").style.display = "none";
                    document.querySelector("#final-screen").style.visibility = "visible";
                    
                    return;
                }
                questionNumber++
                renderQuestionsAndAnswers(questionNumber);
            }
            else {
                document.querySelector(".card-footer").textContent = "incorrect";
            }

        });
    }
}

var finalScore = 100;

document.querySelector("button").addEventListener("click", function(){
    localStorage.setItem("finalScore", finalScore)
    localStorage.setItem("initials", JSON.stringify(document.querySelector("input").value))
});
