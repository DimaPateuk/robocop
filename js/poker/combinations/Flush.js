import { NAMES, SUITS } from '../constants';

export const FLUSH = 'Flush';
export const FLUSH_POWER = 6;

export const FLUSH_VALUES = (function () {

	const result = {};

	for (let l = 0; l < SUITS.length; l++) {
		let power = 0;

		for (let i = 0; i < NAMES.length; i++) {

			for (let k = i + 1; k < NAMES.length - 4; k++) {
				let resultHash = `${NAMES[i]} ${SUITS[l]} `;

				for (let j = k + 1; j < k + 5; j++) {
					resultHash += `${NAMES[j]} ${SUITS[l]} `;
				}

				result[resultHash] = ++power;
			}
		}
	}

	return result;
})();
