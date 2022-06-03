
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

renderQuestions(0);


renderQuestions(1);



function renderQuestions(index)
{
    var questionDisplay = document.querySelector('#question');
    var answerDisplay = document.querySelector('#answers');

    questionDisplay.textContent = questions[index];
}