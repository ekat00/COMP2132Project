// Grab elements
// Buttons
const buttonRollDice = document.getElementById("roll-dice");
const buttonResetGame = document.getElementById("reset-game");

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
        return 1;
    }else if( die1 === die2 ){
        return ( die1 + die2 )*2;
    }else {
        return die1 + die2;
    }
}

/*
    Run through a round when user clicks the Roll Dice button
        Create 2 dice objects for human
            Roll dice
            Show dice
        Create 2 dice objects for computer
            Roll dice
            Show dice
        Calculate human score
            Show current score
            Add score to totalScoreHuman
        Calculate computer score
            Show current score
            Add score to totalScoreComputer
        Have something to count how many dice rounds
            Once 3 rounds played, compare total scores and determine winner
            Show winner
*/

// Create function for the above
function rollDiceRound(){
    // Human
    // create dice objects
    let humanDie1 = new Dice();
    let humanDie2 = new Dice();
    // roll dice
    let humanDieValue1 = humanDie1.rollDice();
    let humanDieValue2 = humanDie2.rollDice();
    // show dice values
    diceRollHuman1.innerHTML = `<p>Die1: ${humanDieValue1}</p>`;
    diceRollHuman2.innerHTML = `<p>Die2: ${humanDieValue2}</p>`;
    // calculate score
    let currentScoreHuman = calculateCurrentScore(humanDieValue1, humanDieValue2);
    // Show current round score
    currentResultsHuman.innerHTML = `Current score: ${currentScoreHuman}`;
    // add current score to total score
    totalScoreHuman += currentScoreHuman;

    // Computer
    let computerDie1 = new Dice();
    let computerDie2 = new Dice();
    let computerDieValue1 = computerDie1.rollDice();
    let computerDieValue2 = computerDie2.rollDice();
    diceRollComputer1.innerHTML = `<p>Die1: ${computerDieValue1}</p>`;
    diceRollComputer2.innerHTML = `<p>Die2: ${computerDieValue2}</p>`;
    let currentScoreComputer = calculateCurrentScore(computerDieValue1, computerDieValue2);
    // Show current round score
    currentResultsComputer.innerHTML = `Current score: ${currentScoreComputer}`;
    totalScoreComputer += currentScoreComputer;

    // Count as a dice round
    diceRounds++;
}

// Invoke function on roll dice button click
buttonRollDice.addEventListener("click", rollDiceRound);

// Show total score
totalResultsHuman.innerHTML = `<p>Total score: ${totalScoreHuman}</p>`;
totalResultsComputer.innerHTML = `<p>Total score: ${totalScoreComputer}</p>`;

console.log(diceRounds);