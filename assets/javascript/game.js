$('document').ready(function() {

//question objects
var newQuestion1 = {
    question: "who?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 0
}
var newQuestion2 = {
    question: "what?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 1
}
var newQuestion3 = {
    question: "where?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 2
}
var newQuestion4 = {
    question: "when?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 3
}

//array to hold the question objects
var questions = [newQuestion1, newQuestion2, newQuestion3, newQuestion4];

//variable to keep track of question
var questionCounter = 0;

//variable for the timer
var timeLeft = 30;

//variable for the set timer interval
var timer;

//variable to track the status of the game
var gameOver = false;

//function to start the game
// function startTimer() {
//     var timer = setInterval(function() {
//         $('#timer').text(timeLeft);
//         timeLeft--;
//     }, 1000);
// };

//function for the question timer
// function gameTimer() {
//     var timer = setInterval(function() {
//         timeLeft--;
//     }, 1000);
// }

//function to initialize the game on page load
function startGame() {
    $('#main-start').hide();
    $('#start-btn').show().on('click', makeQuestion);
}

//function to call for the timer
function startTimer() {
    $('#timer').text(timeLeft);
    timeLeft--;
};

//function to generate the questions and possible answers - START GAME
// TO DO randomize the selection of questions - put them into one object
function makeQuestion() {
    $('#start-btn').hide();
    $('#main-start').show();
    $('#question').text(questions[questionCounter].question);
    for(var i = 0; i < questions[questionCounter].answers.length; i++) {
        var newAnswers = $("<li data-choice=" + i + ">");
        newAnswers.append(questions[questionCounter].answers[i]);
        console.log(newAnswers);
        $('#answers').append(newAnswers);
    }
    timer = setInterval(startTimer, 1000);
    makeGuess(); 
};

//function for making a guess from the four choices
function makeGuess() {
    $('#answers').on('click', 'li', function() {
        var guess = ($(this).data('choice'));
        console.log(guess);
        if(guess === questions[questionCounter].correctIndex) {
            console.log("correct!");
            clearInterval(timer);
            evaluateGuess();
        } else {
            console.log("wrong!");
            clearInterval(timer);
        }
    });
};

//function to display right or wrong anwer and image
function evaluateGuess() {
    //if statement to evaluate if correct or incorrect
    console.log("it works!");

    setTimeout(makeQuestion, 5000);
    $('#timer').text("");
    $('#question, #answers').empty();
    questionCounter++;
    timeLeft = 30;
};

// makeQuestion();
startGame();


// $('#question').text(firstQuestion.question);

// var newAnswer = $('<li>');

// newAnswer.append(firstQuestion.answers.one.answer1);

// $('#answers').append(newAnswer);









});