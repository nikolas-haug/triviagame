$('document').ready(function() {

//question objects
// TO DO change 'correctIndex' to 'isCorrect' with a boolean value
var newQuestion1 = {
    question: "The scientific name for the humpback whale, megaptera novaeanglia, means what?",
    answers: ["Large earth singer",
              "Large winged New Englander",
              "Newborn ocean angel",
              "New winged beaked flyer"
              ],
    correctIndex: 1,
    image: "assets/images/whale-hello-there.gif"
}
var newQuestion2 = {
    question: "The sperm whale is named after the valuable spermaceti oil found in what part                        its body?",
    answers: ["Stomach",
              "Flippers",
              "Head",
              "Bones"
             ],
    correctIndex: 2,
    image: "assets/images/sperm-whale-head.gif"
}
var newQuestion3 = {
    question: "The blue whale’s tongue is approximately the same size as what other animal?",
    answers: ["An elephant",
              "A bear",
              "An alligator",
              "A tiger"
             ],
    correctIndex: 0,
    image: "assets/images/elephants-walking-road.gif"
}
var newQuestion4 = {
    question: "Approximately how long can a sperm whale stay underwater on a single breath?",
    answers: ["7 hours",
              "2 hours",
              "10 hours",
              "24 hours"
             ],
    correctIndex: 1,
    image: "assets/images/sperm-whale-sequence.gif"
}

//array to hold the question objects
var questions = [newQuestion1, newQuestion2, newQuestion3, newQuestion4];

//variable to keep track of question
var questionCounter = 0;

//variable for the timer
var timeLeft = 10;

//variable for the set timer interval
var timer;

//variable for correct answers
var correctAnswers = 0;

//variable for wrong answers
var wrongAnswers = 0;

//variable for unanswered questions
var unAnswered = 0;

//variable to track the status of the game
var gameOver = false;

//function to initialize the game on page load
function startGame() {
    $('.game-main, #retry-btn').hide();
    $('#main-start, #results').hide();
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
    //call function to adjust status of the game
    gameStatus();
    //check the status of the game
    if(gameOver === false) {

        $('#timer, .game-main, #answer-info').show();
        $('#start-btn, #retry-btn').hide();
        $('#img-row').hide();
        $('#results').hide();
        //remove img attribute
        $('#variable-img').removeAttr('src');
        $('#status-text, #correct-answer').text("");
        $('#main-start').show();
        $('#question').text(questions[questionCounter].question);
        for(var i = 0; i < questions[questionCounter].answers.length; i++) {
            var newAnswers = $("<li data-choice=" + i + ">");
            newAnswers.append(questions[questionCounter].answers[i]);
            console.log(newAnswers);
            $('#answers').append(newAnswers);
        }
        timer = setInterval(startTimer, 1000);
    } else {
        endGame();
    } 
};

    //event listenr added onced (bound) to the dynamically generated DOM elements
    $('#answers').on('click', 'li', function() {
        var guess = ($(this).data('choice'));
        console.log(guess);
        if(guess === questions[questionCounter].correctIndex) {
            console.log("correct!");
            correctAnswers++;
            $('#answer-status').text("Correct answer!");
            $('#answer-info').hide();
            clearInterval(timer);
            evaluateGuess();
        } else {
            console.log("wrong!");
            wrongAnswers++;
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
    $('#variable-img').attr('src', questions[questionCounter].image);
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
    $('#variable-img').attr('src', questions[questionCounter].image);
    $('.game-main').hide();
    $('#timer').empty().hide();
    $('#status-text').text("time's up!");
    $('#question, #answers, #answer-status').empty();
    // TO DO - display the question object's image
    $('#img-row').show();
    unAnswered++;
    questionCounter++;
    timeLeft = 10;
    setTimeout(makeQuestion, 3000);
}

//function to check game status
function gameStatus() {
    if(questionCounter === questions.length) {
        gameOver = true;
    }
}

//function for end of game
function endGame() {
    clearInterval(timer);
    gameOver = false;
    //show the results of the game
    $('#results').show();
    $('#right').text("Correct answers: " + correctAnswers);
    $('#wrong').text("Wrong answers: " + wrongAnswers);
    $('#unanswered').text("Not answered: " + unAnswered);
    $('.game-main').hide();
    $('#main-start').hide();
    $('#img-row').hide();
    $('#status-text').text("");
    $('#retry-btn').show().off().on('click', makeQuestion);
    
    questionCounter = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    unAnswered = 0;
}

// makeQuestion();
startGame();

});