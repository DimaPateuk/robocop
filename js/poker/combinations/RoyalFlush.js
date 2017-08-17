import {
	VALUES,
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
	ACE,
	TEN,
} from '../constants';
import {
	separateCardsBySuit,
	areFiveCardsOneByOne,
} from './utils';

export const ROYAL_FLUSH_POWER = 10;

export const ROYAL_FLUSH = 'Royal flush';

function exclude (card) {
	return VALUES[card.name] < VALUES[TEN];
}

export function isRoyalFlush (cards) {
	const separatedCards = separateCardsBySuit(cards, exclude);
	return [
		separatedCards[HEART],
		separatedCards[DIAMOND],
		separatedCards[CLUB],
		separatedCards[SPADE],
	].some(arr => areFiveCardsOneByOne(arr));

}

/*tests*/

import { testFunction } from '../../utils/test';
import Card from '../cards/Card';
import {
	JACK,
	QUEEN,
	KING,
} from '../constants';

testFunction(
	'Royal Flush TEST 1',
	isRoyalFlush,
	[
		[
			new Card(TEN, HEART),
			new Card(JACK, HEART),
			new Card(QUEEN, HEART),
			new Card(KING, HEART),
			new Card(ACE, HEART),
		],
	],
	true
);

testFunction(
	'Royal Flush TEST 2',
	isRoyalFlush,
	[
		[
			new Card(TEN, HEART),
			new Card(JACK, HEART),
			new Card(QUEEN, DIAMOND),
			new Card(KING, HEART),
			new Card(ACE, HEART),
			new Card(ACE, DIAMOND),
		],
	],
	false
);

testFunction(
	'Royal Flush TEST 3',
	isRoyalFlush,
	[
		[
			new Card(TEN, HEART),
			new Card(QUEEN, HEART),
			new Card(KING, HEART),
			new Card(ACE, HEART),
		],
	],
	false
);

testFunction(
	'Royal Flush TEST 4',
	isRoyalFlush,
	[
		[
			new Card(KING, HEART),
			new Card(TEN, HEART),
			new Card(QUEEN, HEART),
			new Card(KING, HEART),
			new Card(ACE, HEART),
		],
	],
	false
);


testFunction(
	'Royal Flush TEST 5',
	isRoyalFlush,
	[
		[
			new Card(JACK, HEART),
			new Card(TEN, HEART),
			new Card(QUEEN, HEART),
			new Card(KING, HEART),
			new Card(ACE, HEART),
		],
	],
	true
);
