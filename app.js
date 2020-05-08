/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CODING CHALLENGE:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
Hint: Always save the previous dice roll in a separate variable.

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
Hint: you can read the value with the .value property in JavaScript. This is a good oportunity to use google to figure this out.

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.

*/

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

var scores, roundScore, activePlayer, gamePlaying, winScore;

init();

var prevDice;

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	winScore = 100;

	// document.querySelector('.dice').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');

	document.querySelector('.btn-win').textContent = 'OK';
	document.getElementById('win-score').value = '100';
}

function nextPlayer() {
	// Next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	// document.querySelector('.dice').style.display = 'none';
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-win').addEventListener('click', function() {
	winScore = document.getElementById('win-score').value;
	document.querySelector('.btn-win').innerHTML = '&#10004;';
});

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Random number
		var dice_1 = Math.floor(Math.random() * 6) + 1;
		var dice_2 = Math.floor(Math.random() * 6) + 1;

		// 2. Display the result
		var diceDOM_1 = document.getElementById('dice-1');
		diceDOM_1.style.display = 'block';
		diceDOM_1.src = 'dice-' + dice_1 + '.png';

		var diceDOM_2 = document.getElementById('dice-2');
		diceDOM_2.style.display = 'block';
		diceDOM_2.src = 'dice-' + dice_2 + '.png';

		// Remove entire score when player gets two 6s in a row
		// if (dice_1 === 6 && prevDice === 6) {
		// 	scores[activePlayer] = 0;
		// 	document.querySelector('#score-' + activePlayer).textContent = '0';

		// 	nextPlayer();

		// // 3. Update the round score IF the rolled number was NOT a 1
		// } else 	

		if (dice_1 === 1 || dice_2 ===1) {
			// Next player
			nextPlayer();			

		} else {
			// Add score
			roundScore += dice_1 + dice_2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		}

		prevDice = dice_1;
	}

});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add current score to global score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// Check if player won the game
		if (scores[activePlayer] >= winScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

			// document.querySelector('.dice').style.display = 'none';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';

			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

			gamePlaying = false;

		} else {
			nextPlayer();

		}
	}

});

document.querySelector('.btn-new').addEventListener('click', init);