import Card from './Card';
import { NAMES, SUITS } from './constants.js'

export const makeDeckCards = function () {
	const result = {};
	for (let i = 0; i < NAMES.length; i++) {
		for (let j = 0; j < SUITS.length; j++) {
			result[NAMES[i] + SUITS[j]] = new Card(NAMES[i], SUITS[j]);
		}
	}

	return result;
}
