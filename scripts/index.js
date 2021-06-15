// Grab elements
// Buttons
const buttonRollDice = document.getElementById("roll-dice");
const buttonResetGame = document.getElementById("reset-game");

// Elements to show dice rolls
let rollsHuman = document.getElementById("human-dice");
let rollsComputer = document.getElementById("computer-dice");

// Elements to show current score
let resultsHuman = document.getElementById("human-results");
let resultsComputer = document.getElementById("computer-results");

// Player scores - current round
let scoreHuman = 0;
let scoreComputer = 0;

// Player scores - total
let totalScoreHuman = 0;
let totalScoreComputer = 0;

// Player dice
let roll1 = 0;
let roll2 = 0;

// Dice object
class Dice{
    constructor(){
        this.die1 = [1, 2, 3, 4, 5, 6];
        this.die2 = [1, 2, 3, 4, 5, 6];
    }
    
    rollDice(){
        let i = Math.round(Math.random() * (this.die1.length - 1));
        roll1 = this.die1[i];
        //roll1 = i;
        let j = Math.round(Math.random() * (this.die2.length - 1));
        roll2 = this.die2[j]
        //roll2 = j;
    }

    showRoll1(){
        return `Die 1 = ${roll1}`;
    }
    showRoll2(){
        return `Die 2 = ${roll2}`;
    }
}




// Invoke Dice object
const humanRound1 = new Dice();
humanRound1.rollDice();
//resultsHuman.innerHTML += humanRound1.die1.length;
//resultsHuman.innerHTML += `<p>${Math.floor(Math.random() * humanRound1.die1.length + 1)}</p>`;

// Show rolled dice
rollsHuman.innerHTML = humanRound1.showRoll1();
rollsHuman.innerHTML += humanRound1.showRoll2();

// Calculate score
if( roll1 === 1 || roll2 === 1 ){
    scoreHuman += 1;
}else if( roll1 === roll2 ){
    scoreHuman += ( roll1 + roll2 )*2;
}else {
    scoreHuman += roll1 + roll2;
}

// Show current round score
resultsHuman.innerHTML += `Current score: ${scoreHuman}`;