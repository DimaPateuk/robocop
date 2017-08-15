import { NAMES, SUITS } from '../constants';

export const STRAIGHT_FLUSH = 'Straight Flush';

export const STRAIGHT_FLUSH_POWER = 9;

export const STRAIGHT_FLUSH_VALUES = (function () {

	const result = {};

	for (let i = 0; i < SUITS.length; i++) {

		for (let j = 0; j < NAMES.length - 5; j++) {

			let resultHash = '';

			for (let k = j; k < j + 5; k++) {
				resultHash += `${NAMES[k]} ${SUITS[i]} `;
			}

			result[resultHash] = j;
		}
	}

	return result;

})();
