
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const listScores = document.getElementById('list');
const clearButton = document.getElementById('clear-button')


//update local storage 
localStorage.setItem("highScores", JSON.stringify(highScores));  
 

listScores.innerHTML = highScores
.map(theScore => {
    return `<li class="high-score">${theScore.name} - ${theScore.score}</li>`;
})
.join(""); 

 //clear high scores function

 clearAll = () => {
    window.localStorage.clear();
    listScores.innerText = "Cleared!" 
    clearButton.classList.add('hide')
   }
