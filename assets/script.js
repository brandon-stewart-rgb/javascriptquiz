// constants
const question = document.getElementById("question");
// gets an array of the 4 buttons along with the data-set
const choices = Array.from( document.getElementsByClassName("btn-answer"));
const correctAnswer = document.getElementById("correct");
const wrongAnswer = document.getElementById("wrong");

const containerOne = document.getElementById("container-one");
const containerTwo = document.getElementById("container-two");
const containerThree = document.getElementById("container-three");

const username = document.getElementById("username")
const finalScore = document.getElementById("final-score")

const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const submit = document.getElementById('submit');
const listScores = document.getElementById('list');


username.addEventListener('keyup', () => {
    submit.disabled = !username.value;
});

 

// variables
let currentQuestion = {};
// set to false initially to wait for page load
let acceptingAnswers = false;
let questionCounter = 0;
let timeLeft = 25;
// empty array
let availableQuestions = [];
let Points = 20;
var score = 0;
const maxQuestions = 4; 



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
    choice3: "Other Arrays",
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


 
startGame = () => {
    // reset  to make sure we're starting at first question
    questionCounter = 0;
    // reset score
    score = 0;
    // copy to get a full copy of questions with spread operator... 
    availableQuestions = [...questions];
    getNewQuestion();
};



getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions )  {
    return [
        containerOne.classList.add('hide'), 
        containerTwo.classList.remove('hide'),
        countdown.classList.add('hide'), 
        localStorage.setItem("mostRecentScore", score), 
        finalScore.innerHTML = "<strong>" + score + "!</strong>"
          ];
    };   
    // starting game increments to 1
    questionCounter ++;
    //random questions and answers each time
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question; 
    // choices
    choices.forEach((choice) => {
        //give me number property from data-set saved to number
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
    
        // if selected answer is true
        if (selectedAnswer == currentQuestion.answer) {
        // increase score
        incrementScore(Points)
        // and...show correct! via class remove
        correctAnswer.classList.remove('hide');
        } else {
        // decrement time
        timeLeft-=10;
        // and...show wrong! via class remove
        wrongAnswer.classList.remove('hide');
        
        }

        // slow things down a bit in order to see correct/incorrect states
        setTimeout( () => {
            getNewQuestion();
            wrongAnswer.classList.add('hide');
            correctAnswer.classList.add('hide');
        }, 2000)
       
    });
});



// Timer started at 75 seconds    
var downloadTimer = setInterval(function() {
    if(timeLeft <= 0)
    {
    clearInterval(downloadTimer);
     return containerOne.classList.add('hide') || containerTwo.classList.remove('hide') || countdown.classList.add('hide');
     ;
     } else {
      document.getElementById("countdown").innerHTML = timeLeft + " seconds remaining";
     }
     timeLeft -= 1;
}, 1000);

 
// increase score function        
incrementScore = num => {
    score +=num;  
}



saveInitials = (e) => {
        e.preventDefault();
        // create an array of score and name
        const theScore = {
            score: mostRecentScore,
            name: username.value,
        };
        // adds new items to the array of high scores
        highScores.push(theScore);
        // sort scores
        highScores.sort( (a,b) => {
            return b.theScore - a.theScore;
        });
        highScores.splice(5);

        //update local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));  

        containerTwo.classList.add('hide');
        containerThree.classList.remove('hide');

        listScores.innerHTML = highScores
        .map( theScore => {
            return "<li>" + theScore.score + " | " + theScore.name + "</li>"
             
        });
        
}



// begin the game
startGame();