const question = document.getElementById("question");
const choices = Array.from( document.getElementsByClassName("btn-answer"));
const correctAnswer = document.getElementById("correct");
const wrongAnswer = document.getElementById("wrong");
const containerOne = document.getElementById("container-one");
const containerTwo = document.getElementById("container-two");
const containerThree = document.getElementById("container-three");
const username = document.getElementById("username")
const finalScore = document.getElementById("final-score", score)
const submit = document.getElementById('submit');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const listScores = document.getElementById('list');
const headerParagraph = document.getElementById('header-paragraph')
const timeUp = document.getElementById('time-up');
const clearButton = document.getElementById('clear-button')
let currentTime = 30;
let timerId = null;
const timeLeft = document.getElementById('time-left');
let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
// empty array
let availableQuestions = [];
let Points = 1;
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
    if(availableQuestions.length === 0 && questionCounter >= maxQuestions )  {
    return [
        containerOne.classList.add('hide'), 
        containerTwo.classList.remove('hide'),
        timeLeft.classList.add('hide'),   
        headerParagraph.classList.add('hide') 
          ]; 
    };  

    // starting game increments questions by 1
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
       currentTime -=10;
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

 
 
// increase score function        
incrementScore = num => {
    score +=num;  
    finalScore.innerHTML = "<strong>" + score + "!</strong>"  
}
// on keyup allow enter button
username.addEventListener('keyup', () => {
    submit.disabled = !username.value;
});

saveInitials = (e) => {
        e.preventDefault();

        // create an array of score and name
        const theScore = {
            score,
            name: username.value,
        };

        // adds new items to the array of high scores
        highScores.push(theScore);
        // sort scores
        highScores.sort((a, b) => 
        b.score- a.score
        );
        highScores.splice(8);
        //update local storage 
        localStorage.setItem("highScores", JSON.stringify(highScores));  
         

        listScores.innerHTML = highScores
        .map(theScore => {
            return `<li class="high-score">${theScore.name} - ${theScore.score}</li>`;
        })
        .join(""); 
        // stop the clock to keep hide classes from appearing
        clearInterval(timerId)
        clearInterval(countDownTimerId)

        containerTwo.classList.add('hide');
        containerThree.classList.remove('hide');

        return;     
};
  
countDown = () => {
    currentTime--;
    timeLeft.textContent = currentTime;
   
    if (currentTime <= 0) { 
      return [
           clearInterval(timerId),
           clearInterval(countDownTimerId), 
           containerOne.classList.add('hide'), 
           containerTwo.classList.remove('hide'), 
           timeLeft.classList.add('hide'), 
           timeUp.classList.remove('hide')
      ];
    } 
   
   };
   let countDownTimerId = setInterval(countDown, 1000);

 //clear high scores function
  clearAll = () => {
    window.localStorage.clear();
    listScores.innerText = "Cleared!" 
    clearButton.classList.add('hide')
   }

// begin the game
startGame();