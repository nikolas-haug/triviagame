$('document').ready(function() {

//question objects
// TO DO put all objects into a single array or separate file
var newQuestion1 = {
    question: "The scientific name for the humpback whale, megaptera novaeanglia, means what?",
    answers: [
              "Large earth singer",
              "Large winged New Englander",
              "Newborn ocean angel",
              "New winged beaked flyer"
              ],
    correctIndex: 1,
    image: "assets/images/whale-hello-there.gif"
}
var newQuestion2 = {
    question: "The sperm whale is named after the valuable spermaceti oil found in what part                        its body?",
    answers: [
              "Stomach",
              "Flippers",
              "Head",
              "Bones"
             ],
    correctIndex: 2,
    image: "assets/images/sperm-whale-head.gif"
}
var newQuestion3 = {
    question: "The blue whale’s tongue is approximately the same size as what other animal?",
    answers: [
              "An elephant",
              "A bear",
              "An alligator",
              "A tiger"
             ],
    correctIndex: 0,
    image: "assets/images/elephants-walking-road.gif"
}
var newQuestion4 = {
    question: "Approximately how long can a sperm whale stay underwater on a single breath?",
    answers: [
              "7 hours",
              "2 hours",
              "10 hours",
              "24 hours"
             ],
    correctIndex: 1,
    image: "assets/images/sperm-whale-sequence.gif"
}
var newQuestion5 = {
    question: "What is the method of feeding used by humpback whales that allows them to round up highly            concentrated masses of prey?",
    answers: [
             "Surface mouth feeding",
             "Deep-water feeding",
             "Skim feeding",
             "Bubble-net feeding"
             ],
    correctIndex: 3,
    image: "assets/images/humpback-feeding.gif"
}
var newQuestion6 = {
    question: "What is the average length in feet of an adult blue whale?",
    answers: [
             "150ft",
             "85ft",
             "60ft",
             "100ft"
             ],
    correctIndex: 1,
    image: "assets/images/blue-whale-spinning.gif"
}
var newQuestion7 = {
    question: "Which of the following is a characteristic of all baleen whales?",
    answers: [
             "2 blowholes",
             "Females are larger",
             "Seasonal feeders",
             "All of the above"
             ],
    correctIndex: 3,
    image: "assets/images/humpback-nose.gif"
}
var newQuestion8 = {
    question: "What animal has the largest brain?",
    answers: [
             "Orca",
             "Blue whale",
             "Sperm whale",
             "Grey whale"
             ],
    correctIndex: 2,
    image: "assets/images/spinning-sperm-whale.gif"
}
var newQuestion9 = {
    question: "Which of the following foods are most eaten by sperm whales?",
    answers: [
             "Giant squid",
             "Blue shark",
             "Giant sting ray",
             "Yellow fin tuna"
             ],
    correctIndex: 0,
    image: "assets/images/giant-squid-sperm-whale.gif"
}
var newQuestion10 = {
    question: "Which of the following body parts does the beluga whale not have?",
    answers: [
             "Blowhole",
             "Fins",
             "Flippers",
             "Beak"
             ],
    correctIndex: 1,
    image: "assets/images/halo-beluga-whale.gif"
}
var newQuestion11 = {
    question: "The average life expectancy of a sperm whale is approximately how many years?",
    answers: [
             "200 years",
             "70 years",
             "50 years",
             "100 years"
             ],
    correctIndex: 1,
    image: "assets/images/whale-flukes.gif"
}

//array to hold the question objects
// TO DO simplify this with a single array of objects or loop with numbers/variables
var questions = [newQuestion1, newQuestion2, newQuestion3, newQuestion4, newQuestion5, newQuestion6, newQuestion7, newQuestion8, newQuestion9, newQuestion10, newQuestion11];

//variable to keep track of question
var questionCounter = 0;

//variable for the timer
var timeLeft = 30;

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
    $('.game-main, #retry-btn, #main-start, #results, #img-row').hide();
    $('#start-btn').show().on('click', makeQuestion);
}

//function to call for the timer
function startTimer() {
    //add checktimer
    if(timeLeft === 0) {
        // console.log("time's up!");
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
        $('#start-btn, #retry-btn, #img-row, #results').hide();
        //remove img attribute
        $('#variable-img').removeAttr('src');
        $('#status-text, #correct-answer').text("");
        $('#main-start').show();
        $('#question').text(questions[questionCounter].question);
        for(var i = 0; i < questions[questionCounter].answers.length; i++) {
            var newAnswers = $("<li data-choice=" + i + ">");
            newAnswers.append(questions[questionCounter].answers[i]);
            // console.log(newAnswers);
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
        // console.log(guess);
        if(guess === questions[questionCounter].correctIndex) {
            // console.log("correct!");
            correctAnswers++;
            $('#answer-status').text("Correct answer!");
            $('#answer-info').hide();
            clearInterval(timer);
            evaluateGuess();
        } else {
            // console.log("wrong!");
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
    $('#variable-img').attr('src', questions[questionCounter].image);
    // console.log(questions[questionCounter].image);
    setTimeout(makeQuestion, 7000);
    $('#question, #answers').empty();
    questionCounter++;
    timeLeft = 30;
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
    timeLeft = 30;
    setTimeout(makeQuestion, 7000);
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
    $('.game-main, #main-start, #img-row').hide();
    // $('#main-start').hide();
    // $('#img-row').hide();
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