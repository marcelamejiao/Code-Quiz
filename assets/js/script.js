var quiz = {
    questions: [
        {
            questionHeading: "Test question 1?",
            availableAnswers: ["2", '6', '15', '105'],
            correctAnswer: "15"
        }
    ]
};

renderQuestionsAndAnswers(0);

function renderQuestionsAndAnswers(index)
{
    var questionDisplay = document.querySelector('#question');
    var answerDisplay = document.querySelector('#answers');

    questionDisplay.textContent = quiz.questions[index].questionHeading;

    // Clear answerDisplay element 
    answerDisplay.innerHTML = "";
 
    // Render a new li for each answer
    for (var i = 0; i < quiz.questions[index].availableAnswers.length; i++) {
        var answer = quiz.questions[index].availableAnswers[i];

        var li = document.createElement("li");
        li.textContent = answer;
        // li.setAttribute("data-index", i);

        answerDisplay.appendChild(li);

        // answer.addEventListener("click", function(){
        //     if 

        // })
    }
}

