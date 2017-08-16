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

export function separateCardsBySuit (cards, exclude = () => false) {
	const result = {
		[HEART]: [],
		[DIAMOND]: [],
		[CLUB]: [],
		[SPADE]: [],
	};

	for (let i = 0; i < cards.length; i++) {
		if (!exclude(cards[i])) {
			result[cards[i].suit].push(cards[i]);
		}
	}

	result[HEART] = sortCards(result[HEART]);
	result[DIAMOND] = sortCards(result[DIAMOND]);
	result[CLUB] = sortCards(result[CLUB]);
	result[SPADE] = sortCards(result[SPADE]);

	return result;
}

export function isFiveCardsCombination (cards) {
	const length = cards.length;

	if (length < 4) {
		return false;
	}

	return true;
}

export function isFourCardsCombination (cards) {
	const length = cards.length;

	if (length < 3) {
		return false;
	}

	return true;
}

export function areFiveCardsOneByOne (cards) {
	if (!isFiveCardsCombination(cards)) {
		return false;
	}

	const length = cards.length;
	const lastCardIndex = length - 1;


	let previousValue = VALUES[cards[lastCardIndex].name];
	let count = 1;

	for (let i = lastCardIndex - 1 ; i >= 0; i--) {
		const currentValue = VALUES[cards[i].name];

		if (count === 5) {
			return true;
		}

		if (currentValue !== previousValue - 1) {
			count = 0;
		}

		previousValue = currentValue;
		count++;
	}

	return count === 5;
}

export function countSameNameCards (cards) {
	const namesMap = {};

	for (let i = 0; i < cards.length; i++) {
		if (namesMap[cards[i].name]) {
			namesMap[cards[i].name]++;
		} else {
			namesMap[cards[i].name] = 1;
		}
	}

	return namesMap;
}

