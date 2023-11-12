
//Selecting Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const diceElement1 = document.querySelector('.dice1');
const diceElement2 = document.querySelector('.dice2');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const winMessage = document.querySelector(".Win-message")


let scores, currentScore, activePlayer, playing,sum;

//Initial Conditions
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  playing = true;

  diceElement1.classList.add('hidden');
  diceElement2.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

//functions
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  sum=0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Button Roll Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice number
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display dice
    diceElement1.src = `dice-${dice1}.png`;
    diceElement1.classList.remove('hidden');
    diceElement2.src = `dice-${dice2}.png`;
    diceElement2.classList.remove('hidden');

    if (dice1 === 6 && dice2 ===6) {
      switchPlayer();
     
    } else {
      sum=dice1+dice2;
      currentScore += sum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add the current score to the player's score
    scores[activePlayer] += currentScore;
    //Display the score to the current player's scores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Check if the score[activeplayer] >= 100, if true exit the game
    if (scores[activePlayer] >= 100) {
      winMessage.style.display = "flex";
      //Finish the game
      diceElement1.classList.add('hidden');
      diceElement2.classList.add('hidden');
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } 
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  winMessage.style.display = "none";
  init();
});
