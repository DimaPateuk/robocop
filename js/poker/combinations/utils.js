import {
	VALUES,
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
} from '../constants';
import sortBy from 'lodash/sortBy';

export function sortCards (cards) {
	return sortBy(cards, (card) => VALUES[card.name]);
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
