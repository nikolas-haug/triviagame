$('document').ready(function() {

//question objects
var newQuestion1 = {
    question: "who?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 0
}
var newQuestion2 = {
    question: "who?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 1
}
var newQuestion3 = {
    question: "who?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 2
}
var newQuestion4 = {
    question: "who?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 3
}

//array to hold the question objects
var questions = [newQuestion1, newQuestion2, newQuestion3, newQuestion4];

//variable to keep track of question
var questionCounter = 0;

//function to generate the questions and possible answers
// TO DO randomize the selection of questions - put them into one object
function makeQuestion() {
    $('#question').text(questions[questionCounter].question);
    for(var i = 0; i < questions[questionCounter].answers.length; i++) {
        var newAnswers = $("<li data-choice=" + i + ">");
        newAnswers.append(questions[questionCounter].answers[i]);
        $('#answers').append(newAnswers);
    } 
    makeGuess(); 
};

function makeGuess() {
    $('#answers').on('click', 'li', function() {
        var guess = ($(this).data('choice'));
        console.log(guess);
    });
};

makeQuestion();


// $('#question').text(firstQuestion.question);

// var newAnswer = $('<li>');

// newAnswer.append(firstQuestion.answers.one.answer1);

// $('#answers').append(newAnswer);









});