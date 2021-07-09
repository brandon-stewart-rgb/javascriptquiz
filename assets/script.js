// constants
const question = document.getElementById("question");
// gets an array of the 4 buttons along with the data-set
const choices = Array.from( document.getElementsByClassName("btn-answer"));
const correctAnswer = document.getElementById("correct");
const wrongAnswer = document.getElementById("wrong");
const finalScore = document.getElementById("final-score");

// variables
let currentQuestion = {};
// set to false initially to wait for page load
let acceptingAnswers = false;
var score = 0;




let questionCounter = 0;
let timeLeft = 75;
let availableQuestions = [];


// array of questions
let questions = [
    
    {   
    question: "Commonly used data types DO NOT include:",
    choice1: "Strings",
    choice2: "Booleans",
    choice3: "Alerts",
    choice4: "Numbers",
    answer: 3,
    },
    {   
    question: "Arrays in Javascript can be used to store_______.",
    choice1: "Numbers and Strings",
    choice2: "Booleans",
    choice3: "Alerts",
    choice4: "All of the above",
    answer: 4,
    },
    {   
    question: "String values must be enclosed within _______when being assigned to variables.",
    choice1: "Quotes",
    choice2: "Curly Brackets",
    choice3: "Square Brackets",
    choice4: "Parenthesis",
    answer: 3,
    },
    {   
    question: "A very useful tool used during development and debugging is:",
    choice1: "Console Log",
    choice2: "Other Arrays",
    choice3: "For Loops",
    choice4: "Javascript",
    answer: 1,
    },
];


const maxQuestions = 4;

startGame = () => {
    // reset  to make sure we're starting at first question
    questionCounter = 0;
    // reset score
     
    // copy to get a full copy of questions with spread operator... 
    availableQuestions = [...questions];
    getNewQuestion();

};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions){;
    return window.location.assign("/endgame.html")
    }   
    // starting game increments to 1
    questionCounter ++;
    //random questions and answers each time
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        //give me number property from data-set 
        const number = choice.dataset['number'];
        // doing the same thing with choices
        choice.innerText = currentQuestion['choice' + number ];
    });
    // makes sure not to use a question that's been used
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
    

        if (selectedAnswer == currentQuestion.answer ) {
        // increase score
        score ++;
        // and...
        correctAnswer.classList.remove('hide');
        
        } else {
        // decrement time
        timeLeft-=10;
        wrongAnswer.classList.remove('hide');
        
        }

        setTimeout( () => {
            getNewQuestion();
            wrongAnswer.classList.add('hide');
            correctAnswer.classList.add('hide');
        }, 2000)
        //setTimeout(getNewQuestion, 3000);
        
    });
});

    // Timer started at 75 seconds    
    var downloadTimer = setInterval(function(){
    if(timeLeft <= 0){
    clearInterval(downloadTimer);
     document.getElementById("countdown").innerHTML = "Finished!";
     } else {
      document.getElementById("countdown").innerHTML = timeLeft + " seconds remaining";
     }
     timeLeft -= 1;
    }, 1000);



    
// begin the game
startGame();
