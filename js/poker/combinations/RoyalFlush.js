// import Card from '../cards/Card';
// import {
// 	TEN,
// 	JACK,
// 	QUEEN,
// 	KING,
// } from '../constants';

import {
	VALUES,
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
	ACE,
} from '../constants';
import { separateCardsBySuit, areFiveCardsOneByOne } from './utils';


export const ROYAL_FLUSH_POWER = 10;

export const ROYAL_FLUSH = 'Royal flush';

export function isRoyalFlush (cards) {
	const separatedCards = separateCardsBySuit(cards);
	return [
		separatedCards[HEART],
		separatedCards[DIAMOND],
		separatedCards[CLUB],
		separatedCards[SPADE],
	].some(arr => _isRoyalFlush(arr));

}

function _isRoyalFlush (cards) {

	const lastCards = cards[cards.length - 1];

	if (!lastCards || VALUES[lastCards.name] !== VALUES[ACE]) {
		return false;
	}

	return areFiveCardsOneByOne(cards);
}







// const cards = [
// 	new Card(TEN, HEART),
// 	new Card(ACE, DIAMOND),
// 	new Card(KING, DIAMOND),
// 	new Card(KING, HEART),

// 	new Card(QUEEN, HEART),
// 	new Card(JACK, HEART),
// 	new Card(ACE, HEART),
// 	new Card(JACK, DIAMOND),
// ];

// console.log(isRoyalFlush(cards));
