import { NAMES, SUITS } from '../constants';

export const FOUR_OF_A_KIND = 'Four of a kind';
export const FOUR_OF_A_KIND_POWER = 8;

export const FOUR_OF_A_KIND_VALUES = (function () {

	const result = {};

	for (var i = 0; i < NAMES.length; i++) {
		let resultHash = '';

		for (var j = 0; j < SUITS.length; j++) {
			resultHash += `${NAMES[i]} ${SUITS[j]} `;
		}

		result[resultHash] = i;
	}

	return result;
})();
