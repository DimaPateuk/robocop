import { isRoyalFlush } from './RoyalFlush';
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
	countCardsOneByOne,
} from './utils';

export const STRAIGHT_FLUSH = 'Straight Flush';

export const STRAIGHT_FLUSH_POWER = 9;

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

	if (!lastCards || isRoyalFlush(cards)) {
		return false;
	}

	const cardsWithoutAce = cards.filter(card => card.name !== ACE);

	if (countCardsOneByOne(cardsWithoutAce, 4) && cards.length !== cardsWithoutAce.length) {
		return true;
	}

	return areFiveCardsOneByOne(cardsWithoutAce);
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
		],
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
		],
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
		],
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
		],
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
		],
	],
	false
);

testFunction(
	'Straight Flush TEST 6',
	isStrightFlush,
	[
		[
			new Card(TEN, HEART),
			new Card(JACK, HEART),
			new Card(QUEEN, HEART),
			new Card(KING, HEART),
			new Card(ACE, HEART),
		],
	],
	false
);

testFunction(
	'Straight Flush TEST 7',
	isStrightFlush,
	[
		[
			new Card(TWO, HEART),
			new Card(THREE, HEART),
			new Card(FOUR, HEART),
			new Card(FIVE, HEART),
			new Card(ACE, HEART),
		],
	],
	true
);
