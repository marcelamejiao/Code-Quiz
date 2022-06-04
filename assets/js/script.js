// The order of the questions matches the order of the answers
// The number of questions must match the number of answers
var questions = [
    "Test question 1?",
    "Test question 2?"
];

var answers = [
    ["2", '6', '15', '105'],
    ["1", "3", "5", "7"]
];

renderQuestionsAndAnswers(0);

function renderQuestionsAndAnswers(index)
{
    var questionDisplay = document.querySelector('#question');
    var answerDisplay = document.querySelector('#answers');

    questionDisplay.textContent = questions[index];
    answerDisplay.textContent = answers[index];

    // Clear answerDisplay element 
    answerDisplay.innerHTML = "";
 
    // Render a new li for each answer
    for (var i = 0; i < answers[index].length; i++) {
        var answer = answers[index][i];

        var li = document.createElement("li");
        li.textContent = answer;
        // li.setAttribute("data-index", i);

        answerDisplay.appendChild(li);
    }
}