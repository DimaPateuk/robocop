import {
	VALUES,
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
	TWO,
	ACE,
} from '../constants';
import sortBy from 'lodash/sortBy';

export function sortCards (cards) {
	return sortBy(cards, (card) => card.value);
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

export function separateCardsByNames (cards) {
	const result = {};

	for (let i = 0; i < cards.length; i++) {
		const arrCards = result[cards[i].name];

		if (arrCards) {
			arrCards.push(cards[i]);
		} else {
			result[cards[i].name] = [cards[i]];
		}
	}

	return result;
}

export function saveNamesCardsOneByOneIntoArr (namesCards, startIndex, amount, result) {
	const arr = [namesCards[startIndex]];
	let j = startIndex + 1;
	for (; j < namesCards.length; j++) {
		const lastFromArrayValue = VALUES[arr[arr.length - 1]];
		const currentValue = VALUES[namesCards[j]];

		if (currentValue === lastFromArrayValue + 1) {
			arr.push(namesCards[j]);
		} else {
			break;
		}

		if (arr.length === amount) {
			result.push(arr);
			break;
		}
	}

	if (namesCards[startIndex] === TWO && arr.length === 4) {
		for (let i = j; i < namesCards.length; i++) {
			if (namesCards[i] === ACE) {
				const arrayFromAce = [namesCards[i]].concat(arr);
				result.push(arrayFromAce);
			}
		}
	}
}

export function calculateStraight (cardNames) {
	const result = [];

	for (let i = 0; i < cardNames.length; i++) {
		saveNamesCardsOneByOneIntoArr(
			cardNames,
			i,
			5,
			result
		);
	}

	return result;
}

export function getLastElementFromArr (arr = [], defaultResult) {
	return arr[arr.length - 1] || defaultResult;
}

export function getLastTwoElements (arr = []) {
	const length = arr.length;
	const lastCard = arr[length - 1];
	const penultimateCard = arr[length - 2];

	return lastCard && penultimateCard ?
		[lastCard, penultimateCard] :
		[];
}
