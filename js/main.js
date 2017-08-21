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
	new Card(SEVEN, HEART),
	new Card(EIGHT, HEART),
	new Card(NINE, HEART),
	new Card(TEN, HEART),
	new Card(JACK, HEART),
	new Card(QUEEN, HEART),
	new Card(KING, HEART),
	new Card(ACE, HEART),

	new Card(TWO, DIAMOND),
	new Card(THREE, DIAMOND),
	new Card(FOUR, DIAMOND),
	new Card(FIVE, DIAMOND),
	new Card(SIX, DIAMOND),
	new Card(SEVEN, DIAMOND),
	new Card(EIGHT, DIAMOND),
	new Card(NINE, DIAMOND),
	new Card(TEN, DIAMOND),
	new Card(JACK, DIAMOND),
	new Card(QUEEN, DIAMOND),
	new Card(KING, DIAMOND),
	new Card(ACE, DIAMOND),

	new Card(TWO, CLUB),
	new Card(THREE, CLUB),
	new Card(FOUR, CLUB),
	new Card(FIVE, CLUB),
	new Card(SIX, CLUB),
	new Card(SEVEN, CLUB),
	new Card(EIGHT, CLUB),
	new Card(NINE, CLUB),
	new Card(TEN, CLUB),
	new Card(JACK, CLUB),
	new Card(QUEEN, CLUB),
	new Card(KING, CLUB),
	new Card(ACE, CLUB),

	new Card(TWO, SPADE),
	new Card(THREE, SPADE),
	new Card(FOUR, SPADE),
	new Card(FIVE, SPADE),
	new Card(SIX, SPADE),
	new Card(SEVEN, SPADE),
	new Card(EIGHT, SPADE),
	new Card(NINE, SPADE),
	new Card(TEN, SPADE),
	new Card(JACK, SPADE),
	new Card(QUEEN, SPADE),
	new Card(KING, SPADE),
	new Card(ACE, SPADE),
];
cardsInfo.parseCards(cards);
console.log(cardsInfo.heightPairValue);
console.log(cardsInfo.heightTwoPairsValue);
console.log(cardsInfo.heightThreeOfAKindValue);
console.log(cardsInfo.heightStraigh);
console.log(cardsInfo.heightFlushValue);
console.log(cardsInfo.heightFullHouseValue);
console.log(cardsInfo.heightFourOfAKindValue);
console.log(cardsInfo.heightStraightFlushValue);
