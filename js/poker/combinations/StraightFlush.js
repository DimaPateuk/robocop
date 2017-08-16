import {
	VALUES,
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
	ACE,
} from '../constants';
import {
	separateCardsBySuit,
	areFiveCardsOneByOne,
	isFiveCardsCombination,
} from './utils';

export const STRAIGHT_FLUSH = 'Straight Flush';

export const STRAIGHT_FLUSH_POWER = 9;

function exclude (card) {
	return VALUES[card.name] === VALUES[ACE];
}

export function isStrightFlush (cards) {
	if (!isFiveCardsCombination(cards)) {
		return false;
	}

	const separatedCards = separateCardsBySuit(cards);
	return [
		separatedCards[HEART],
		separatedCards[DIAMOND],
		separatedCards[CLUB],
		separatedCards[SPADE],
	].some(arr => _isStrightFlush(arr));

}

function _isStrightFlush (cards) {

	const lastCards = cards[cards.length - 1];

	if (!lastCards) {
		return false;
	}

	return areFiveCardsOneByOne(cards);
}

/*tests*/

import { testFunction } from '../../utils/test';
import Card from '../cards/Card';
import {
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
} from '../constants';

testFunction(
	'Straight Flush TEST 1',
	isStrightFlush,
	[
		[
			new Card(TWO, HEART),
			new Card(THREE, HEART),
			new Card(FOUR, HEART),
			new Card(FIVE, HEART),
			new Card(SIX, HEART),
		]
	],
	true
);

testFunction(
	'Straight Flush TEST 2',
	isStrightFlush,
	[
		[
			new Card(TWO, HEART),
			new Card(THREE, HEART),
			new Card(FOUR, HEART),
			new Card(FIVE, HEART),
			new Card(SIX, HEART),
			new Card(ACE, DIAMOND),
		]
	],
	true
);

testFunction(
	'Straight Flush TEST 3',
	isStrightFlush,
	[
		[
			new Card(TWO, HEART),
			new Card(THREE, HEART),
			new Card(FOUR, HEART),
			new Card(FIVE, HEART),
		]
	],
	false
);

testFunction(
	'Straight Flush TEST 4',
	isStrightFlush,
	[
		[
			new Card(TWO, HEART),
			new Card(FOUR, HEART),
			new Card(SIX, HEART),
			new Card(FIVE, HEART),
			new Card(THREE, HEART),
		]
	],
	true
);

testFunction(
	'Straight Flush TEST 5',
	isStrightFlush,
	[
		[
			new Card(TWO, DIAMOND),
			new Card(FOUR, HEART),
			new Card(SIX, HEART),
			new Card(FIVE, HEART),
			new Card(THREE, DIAMOND),
		]
	],
	false
);
