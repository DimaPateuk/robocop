import { NAMES, VALUES, SUITS } from '../constants';


export const ROYAL_FLUSH_POWER = 10; // ???

export const ROYAL_FLUSH = 'Royal flush';

export const ROYAL_FLUSH_VALUES = (function () {

	const result = {};

	for (var i = 0; i < SUITS.length; i++) {
		const suit = SUITS[i];
		let resultHash = '';
		for (var k = 0; k < NAMES.length - 4; k++) {
			for (var j = k; j < k + 5; j++) {
				const name = NAMES[j];
				resultHash += name + suit;
			}
			result[resultHash] = (k + 1);
			resultHash = '';
		}
	}

	return result;
})();