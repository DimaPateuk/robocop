import {
	VALUES,
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
} from '../constants';
import sortBy from 'lodash/sortBy';

export function sortCards (cards) {
	return sortBy(cards, (card) =>  VALUES[card.name]);
}

export function separateCardsBySuit (cards) {
	const result = {
		[HEART]: [],
		[DIAMOND]: [],
		[CLUB]: [],
		[SPADE]: [],
	};

	for (let i = 0; i < cards.length; i++) {
		result[cards[i].suit].push(cards[i]);
	}

	result[HEART] = sortCards(result[HEART]);
	result[DIAMOND] = sortCards(result[DIAMOND]);
	result[CLUB] = sortCards(result[CLUB]);
	result[SPADE] = sortCards(result[SPADE]);

	return result;
}

export function areFiveCardsOneByOne (cards) {
	const length = cards.length;
	const lastCardIndex = length - 1;

	if (!length || length < 2) {
		return false;
	}

	let previousValue = VALUES[cards[lastCardIndex].name];
	let count = 1;

	for (let i = lastCardIndex - 1 ; i >= 0; i--) {
		const currentValue = VALUES[cards[i].name];

		if (count === 5) {
			return true;
		}

		if (currentValue !== previousValue - 1) {
			return false;
		}

		previousValue = currentValue;
		count++;
	}

	return count === 5;
}


