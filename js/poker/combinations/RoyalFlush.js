import card from '../Card';
import { VALUES } from '../constants';
import { sortCards } from './utils';


export const ROYAL_FLUSH_POWER = 10;

export const ROYAL_FLUSH = 'Royal flush';

export function isRoyalFlush (cards) {
	cards = sortCards(cards);

	let previousValue = VALUES[cards[0].name];
	let previousSuit = cards[0].suit;

	for (var i = 1; i < cards.length; i++) {
		const currentValue = VALUES[cards[i].name];
		const currentValue = cards[i].suit;

			if (currentValue !== previousValue + 1 ||
				currentSuit !== previousSuit) {
				return false;
			}

		previousValue = currentValue;
		previousSuit = currentValue;

	}

	return true;

}

const cards = [];

console.log()









