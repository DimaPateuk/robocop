import { isRoyalFlush } from './RoyalFlush';
import {
	separateCardsByNames,
	isFiveCardsCombination,
	areFiveCardsOneByOne,
} from './utils';

export const STRAIGHT = 'Straight';
export const STRAIGHT_POWER = 5;

function getNameForAreFiveCardsOneByOne (name) {
	return name;
}

export function isStraight (cards) {
	if (!isFiveCardsCombination(cards) || isRoyalFlush(cards)) {
		return false;
	}

	const separatedCards = separateCardsByNames(cards);
	const separatedCardsNames = Object.keys(separatedCards);

	return areFiveCardsOneByOne(separatedCardsNames, getNameForAreFiveCardsOneByOne);

}

/*tests*/

import { testFunction } from '../../utils/test';
import Card from '../cards/Card';
import {
	JACK,
	QUEEN,
	KING,
	HEART,
	DIAMOND,
	CLUB,
	ACE,
	TEN,
	NINE,
	EIGHT,
} from '../constants';

testFunction(
	'Straight TEST 1',
	isStraight,
	[
		[
			new Card(JACK, HEART),
			new Card(TEN, HEART),
			new Card(QUEEN, HEART),
			new Card(KING, HEART),
			new Card(ACE, HEART),
		],
	],
	false
);

testFunction(
	'Straight TEST 2',
	isStraight,
	[
		[
			new Card(JACK, HEART),
			new Card(TEN, HEART),
			new Card(QUEEN, DIAMOND),
			new Card(KING, HEART),
			new Card(ACE, HEART),
		],
	],
	true
);

testFunction(
	'Straight TEST 3',
	isStraight,
	[
		[
			new Card(JACK, HEART),
			new Card(NINE, HEART),
			new Card(QUEEN, HEART),
			new Card(KING, HEART),
			new Card(ACE, HEART),
		],
	],
	false
);

testFunction(
	'Straight TEST 4',
	isStraight,
	[
		[
			new Card(JACK, CLUB),
			new Card(TEN, HEART),
			new Card(QUEEN, DIAMOND),
			new Card(KING, HEART),
			new Card(ACE, CLUB),
		],
	],
	true
);

testFunction(
	'Straight TEST 5',
	isStraight,
	[
		[
			new Card(JACK, CLUB),
			new Card(TEN, HEART),
			new Card(EIGHT, HEART),
			new Card(QUEEN, DIAMOND),
			new Card(KING, HEART),
			new Card(ACE, CLUB),
		],
	],
	true
);

testFunction(
	'Straight TEST 6',
	isStraight,
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
