import { NAMES, SUITS } from '../constants';
import {
	countSameNameCards,
} from './utils';

export const FOUR_OF_A_KIND = 'Four of a kind';
export const FOUR_OF_A_KIND_POWER = 8;

export function isFourOfAKind (cards) {
	const namesMap = countSameNameCards(cards);
	const arrProperty = Object.keys(namesMap);

	for (let i = 0; i < arrProperty.length; i++) {
		if (namesMap[arrProperty[i]] === 4) {
			return true;
		}
	}

	return false;
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
	SPADE
} from '../constants';

testFunction(
	'Four Of A Kind TEST 1',
	isFourOfAKind,
	[
		[
			new Card(JACK, HEART),
			new Card(QUEEN, HEART),
			new Card(KING, HEART),
			new Card(KING, DIAMOND),
		]
	],
	false
);

testFunction(
	'Four Of A Kind TEST 2',
	isFourOfAKind,
	[
		[
			new Card(JACK, HEART),
			new Card(JACK, SPADE),
			new Card(JACK, CLUB),
			new Card(JACK, DIAMOND),
		]
	],
	true
);

testFunction(
	'Four Of A Kind TEST 3',
	isFourOfAKind,
	[
		[
			new Card(JACK, HEART),
			new Card(KING, SPADE),
			new Card(JACK, CLUB),
			new Card(QUEEN, DIAMOND),
		]
	],
	false
);

testFunction(
	'Four Of A Kind TEST 4',
	isFourOfAKind,
	[
		[
			new Card(JACK, HEART),
			new Card(JACK, SPADE),
			new Card(JACK, CLUB),
			new Card(KING, DIAMOND),
		]
	],
	false
);
