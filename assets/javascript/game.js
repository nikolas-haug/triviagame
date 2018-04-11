$('document').ready(function() {

//question objects
// TO DO change 'correctIndex' to 'isCorrect' with a boolean value
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
var timeLeft = 10;

//variable for the set timer interval
var timer;

//variable to track the status of the game
var gameOver = false;

//function to initialize the game on page load
function startGame() {
    $('#main-start').hide();
    $('#img-row').hide();
    $('#start-btn').show().on('click', makeQuestion);
}

//function to call for the timer
function startTimer() {
    //add checktimer
    if(timeLeft === 0) {
        console.log("time's up!");
        clearInterval(timer);
        // evaluateGuess();
        outOfTime();
    }
    $('#timer').text(timeLeft);
    timeLeft--;
};

//function to generate the questions and possible answers - START GAME
// TO DO randomize the selection of questions - put them into one array
function makeQuestion() {
    $('#timer').show();
    $('#start-btn').hide();
    $('#img-row').hide();
    $('#guess-text').text("");
    $('#main-start').show();
    $('#question').text(questions[questionCounter].question);
    for(var i = 0; i < questions[questionCounter].answers.length; i++) {
        var newAnswers = $("<li data-choice=" + i + ">");
        newAnswers.append(questions[questionCounter].answers[i]);
        console.log(newAnswers);
        $('#answers').append(newAnswers);
    }
    timer = setInterval(startTimer, 1000);
};

    //event listenr added onced (bound) to the dynamically generated DOM elements
    $('#answers').on('click', 'li', function() {
        var guess = ($(this).data('choice'));
        console.log(guess);
        if(guess === questions[questionCounter].correctIndex) {
            console.log("correct!");
            $('#answer-status').text("Correct answer!");
            clearInterval(timer);
            evaluateGuess();
        } else {
            console.log("wrong!");
            $('#answer-status').text("Wrong answer!");
            $('#correct-answer').show().text(questions[questionCounter].answers[questions[questionCounter].correctIndex]);
            clearInterval(timer);
            evaluateGuess();
        }
    });


//function to display right or wrong anwer and image
function evaluateGuess() {
    //if statement to evaluate if correct or incorrect
    
    console.log("it works!");

    $('#img-row').show();

    $('#timer').empty().hide();


    // $('#timer').empty().text("time's up!");

    setTimeout(makeQuestion, 3000);
    
    $('#question, #answers').empty();
    questionCounter++;
    timeLeft = 10;
};

//function to call when timer runs out
function outOfTime() {
    $('#timer').empty().hide();
    $('#guess-text').text("time's up!");
    $('#question, #answers').empty();
    // TO DO - display the question object's image
    $('#img-row').show();
    questionCounter++;
    timeLeft = 10;
    setTimeout(makeQuestion, 3000);
}

// makeQuestion();
startGame();


// $('#question').text(firstQuestion.question);

// var newAnswer = $('<li>');

// newAnswer.append(firstQuestion.answers.one.answer1);

// $('#answers').append(newAnswer);









});