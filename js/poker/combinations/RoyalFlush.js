import { NAMES, VALUES, SUITS } from '../constants';


export const ROYAL_FLUSH_POWER = 10; // ???

export const ROYAL_FLUSH = 'Royal flush';

export const ROYAL_FLUSH_VALUES = (function () {

	const result = {};

	for (var i = 0; i < SUITS.length; i++) {
		let resultHash = '';

		for (var j = NAMES.length - 5; j < NAMES.length; j++) {
			resultHash += NAMES[j] + SUITS[i];
		}

		result[resultHash] = 1;
	}

	return result;
})();
