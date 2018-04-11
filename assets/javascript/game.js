$('document').ready(function() {

//question objects
// TO DO change 'correctIndex' to 'isCorrect' with a boolean value
var newQuestion1 = {
    question: "who?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 0,
    image: "assets/images/whale-hello-there.gif"
}
var newQuestion2 = {
    question: "what?",
    answers: ["this", "that", "then", "there"],
    correctIndex: 1,
    image: "assets/images/halo-beluga-whale.gif"
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
    $('.game-main').hide();
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
    $('#timer, .game-main, #answer-info').show();
    $('#start-btn').hide();
    $('#img-row').hide();
    //remove img attribute
    $('img').removeAttr('src');
    $('#guess-text, #correct-answer').text("");
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
            $('#answer-info').hide();
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
    $('.game-main').hide();
    $('#img-row').show();
    $('#timer').empty().hide();

    // var answerImg = $('<img>');
    $('img').attr('src', questions[questionCounter].image);
    console.log(questions[questionCounter].image);
    // $('#answer-img').append(answerImg);

    setTimeout(makeQuestion, 3000);
    
    $('#question, #answers').empty();
    questionCounter++;
    timeLeft = 10;
};

//function to call when timer runs out
function outOfTime() {
    $('#correct-answer').show().text(questions[questionCounter].answers[questions[questionCounter].correctIndex]);
    $('img').attr('src', questions[questionCounter].image);
    $('.game-main').hide();
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

});