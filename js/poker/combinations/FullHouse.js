import { isRoyalFlush } from './RoyalFlush';

import {
	separateCardsByNames,
	isFiveCardsCombination,
	areFiveCardsOneByOne,
} from './utils';

export const FULL_HOUSE = 'Full house';
export const FULL_HOUSE_POWER = 7;



export function isFullHouse (cards) {

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
