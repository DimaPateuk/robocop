// import Game from './poker/game/BoardGame/BoardGame.js';
// import Player from './poker/Player.js';


// const firstPlayer = new Player (100, 'Robocop');
// const secondPlayer = new Player (100, 'Anticop');

// const game = new Game([firstPlayer, secondPlayer], 10, 20, 1);

// game.start();


// console.log(firstPlayer.handCards.toString());
// console.log(secondPlayer.handCards.toString());

import Card from './poker/cards/Card';
import {
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
	TWO,
	THREE,
	FOUR,
	FIVE,
	SIX,
	SEVEN,
	EIGHT,
	NINE,
	TEN,
	JACK,
	QUEEN,
	KING,
	ACE,
} from './poker/constants';


import CardsInfo from './poker/combinations/CardsInfo';


const cardsInfo = new CardsInfo();

const cards = [
	new Card(TWO, HEART),
	new Card(THREE, HEART),
	new Card(FOUR, HEART),
	new Card(FIVE, HEART),
	new Card(SIX, HEART),

];
cardsInfo.parseCards(cards);
console.log(cardsInfo);
