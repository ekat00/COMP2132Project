// Grab elements
// Buttons
const buttonRollDice = document.getElementById("roll-dice");
const buttonNewGame = document.getElementById("new-game");

// Elements to show dice rolls
const diceRollHuman1 = document.getElementById("human-die-1");
const diceRollHuman2 = document.getElementById("human-die-2");
const diceRollComputer1 = document.getElementById("computer-die-1");
const diceRollComputer2 = document.getElementById("computer-die-2");

// Elements to show current score
const currentResultsHuman = document.getElementById("human-results-current");
const currentResultsComputer = document.getElementById("computer-results-current");

// Elements to show total score
const totalResultsHuman = document.getElementById("human-results-total");
const totalResultsComputer = document.getElementById("computer-results-total");

// Elements on popup
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const popupWinner = document.getElementById("popup-winner");
const popupScores = document.getElementById("popup-scores");

// Keep track of dice rounds (max 3)
let diceRounds = 0;

// Player scores - total
let totalScoreHuman = 0;
let totalScoreComputer = 0;


// Dice object
class Dice{
    constructor(){
        this.die = [1, 2, 3, 4, 5, 6];
    }
    
    rollDice(){
        let i = Math.round(Math.random() * (this.die.length - 1));
        return this.die[i];
    }
}

// Calculate score
function calculateCurrentScore(die1, die2){
    if( die1 === 1 || die2 === 1 ){
        return 0;
    }else if( die1 === die2 ){
        return ( die1 + die2 )*2;
    }else {
        return die1 + die2;
    }
}

// function to change the die image based on the rolled die value
function changeDieImage(targetElement, dieValue){
    targetElement.setAttribute("src", "images/die"+dieValue+".png");
    targetElement.setAttribute("alt", "Die value: "+dieValue);
}

const humanDieImage1 = document.getElementById("human-die-image-1");
const humanDieImage2 = document.getElementById("human-die-image-2");
const computerDieImage1 = document.getElementById("computer-die-image-1");
const computerDieImage2 = document.getElementById("computer-die-image-2");

// Create function for the above
function rollDiceHuman(){
    // Human
    // create dice objects
    let humanDie1 = new Dice();
    let humanDie2 = new Dice();
    // roll dice
    let humanDieValue1 = humanDie1.rollDice();
    let humanDieValue2 = humanDie2.rollDice();
    // show dice values
    changeDieImage(humanDieImage1, humanDieValue1);
    changeDieImage(humanDieImage2, humanDieValue2);
    // calculate score
    let currentScoreHuman = calculateCurrentScore(humanDieValue1, humanDieValue2);
    // Show current round score
    currentResultsHuman.innerHTML = `Current score: ${currentScoreHuman}`;
    // add current score to total score
    totalScoreHuman += currentScoreHuman;
    totalResultsHuman.innerHTML = `<p>Total score: ${totalScoreHuman}</p>`;

}

function rollDiceComputer(){
    // Computer
    // create dice objects
    let computerDie1 = new Dice();
    let computerDie2 = new Dice();
    // roll dice
    let computerDieValue1 = computerDie1.rollDice();
    let computerDieValue2 = computerDie2.rollDice();
    // show dice values
    changeDieImage(computerDieImage1, computerDieValue1);
    changeDieImage(computerDieImage2, computerDieValue2);
    // calculate score
    let currentScoreComputer = calculateCurrentScore(computerDieValue1, computerDieValue2);
    // Show current round score
    currentResultsComputer.innerHTML = `Current score: ${currentScoreComputer}`;
    // add current score to total score
    totalScoreComputer += currentScoreComputer;
    totalResultsComputer.innerHTML = `<p>Total score: ${totalScoreComputer}</p>`;
    
}

let winner = "";

// function to determine winner
function determineWinner(){
    if( totalScoreHuman > totalScoreComputer ){
        winner = "Congrats, you win this round!";
    }else if ( totalScoreHuman < totalScoreComputer ){
        winner = "You lost... bummer."
    }else {
        winner = "It's a tie. Better try again!"
    }
}

// Default to not showing popup
let popupFadeInHandler;
let opacityValue = 0;

// Function for fade-in animation
function fadeIn(){
    opacityValue = opacityValue + .05;
    if(opacityValue <= 1){
        popup.style.opacity = opacityValue;
        requestAnimationFrame( fadeIn );
    }else{
        popup.style.opacity = 1;
    }    
}

// Function to open popup
function displayPopup(){
    popupFadeInHandler = requestAnimationFrame( fadeIn );
}

// Close popup
closePopup.addEventListener("click", function(){
    popup.style.opacity = 0;
});



// Roll dice when user clicks on the Roll Dice button
buttonRollDice.addEventListener("click", function(){
    diceRounds += 1;
    rollDiceHuman();
    rollDiceComputer();
    if( diceRounds === 3 ){
        determineWinner();
        displayPopup(); 
        popupWinner.innerHTML = winner;
        popupScores.innerHTML = `<p>Your score: ${totalScoreHuman}</p>`;
        popupScores.innerHTML += `<p>Computer score: ${totalScoreComputer}</p>`;
        buttonRollDice.disabled = true;
    }
    
});




function clearScores(){
    // clear dice values
    humanDieValue1 = 0;
    humanDieValue2 = 0;
    humanDieImage1.setAttribute("src", "")
    humanDieImage1.setAttribute("alt", "");
    humanDieImage2.setAttribute("src", "");
    humanDieImage2.setAttribute("alt", "");
    computerDieValue1 = 0;
    computerDieValue2 = 0;
    computerDieImage1.setAttribute("src", "");
    computerDieImage1.setAttribute("alt", "");
    computerDieImage2.setAttribute("src", "");
    computerDieImage2.setAttribute("alt", "");
    // clear current scores
    currentScoreHuman = 0;
    currentScoreComputer = 0;
    currentResultsHuman.innerHTML = `Current score: ${currentScoreHuman}`;
    currentResultsComputer.innerHTML = `Current score: ${currentScoreComputer}`;
    // clear total scores
    totalScoreHuman = 0;
    totalScoreComputer = 0;
    totalResultsHuman.innerHTML = `<p>Total score: ${totalScoreHuman}</p>`;
    totalResultsComputer.innerHTML = `<p>Total score: ${totalScoreComputer}</p>`;
    // clear winner and dice round
    popupWinner.innerHTML = "";
    popupScores.innerHTML = "";
    diceRounds = 0;
}

// Clear scores and reset game when the New Game button is clicked
buttonNewGame.addEventListener("click",function(){
    clearScores();
    buttonRollDice.disabled = false;
});