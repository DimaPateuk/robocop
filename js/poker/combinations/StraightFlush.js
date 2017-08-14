import { NAMES, VALUES, SUITS } from '../constants';

export const STRAIGHT_FLUSH = 'Straight Flush';

export const STRAIGHT_FLUSH_POWER = 9;

export const STRAIGHT_FLUSH_VALUES = (function () {

	const result = {};

	for (let i = 0; i < SUITS.length; i++) {

		for (let j = 0; j < NAMES.length - 5; j++) {

			let resultHash = '';

			for (let k = j; k < j + 5; k++) {
				resultHash += NAMES[k] + ' ' + SUITS[i] + ' ';
			}

			result[resultHash] = true;
		}
	}



	return result;

})();


// export const STRAIGHT_FLUSH_VALUES = (function () {

// 	const result = {};

// 	// for (let i = 0; i < SUITS.length; i++) {
// 	// 	SUITS[i]
// 	// }

// 	for (let i = 0; i < NAMES.length - 5; i++) {

// 		for (let j = i; j < NAMES.length - 4; j++) {
// 			let resultHash = NAMES[i] + ' ';

// 			for (let k = j + 1; k < j + 5; k++) {
// 				resultHash += NAMES[k] + ' ';
// 			}

// 			result[resultHash] = true;
// 		}
// 	}


// 	return result;

// })();
