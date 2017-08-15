import { NAMES, SUITS } from '../constants';

export const STRAIGHT = 'Straight';
export const STRAIGHT_POWER = 5;

export const STRAIGHT_VALUES = (function () {

	const result = {};

	let power = 0;

	for (let j = 0; j < NAMES.length - 5; j++) {

		let namesCombinations	 = [];

		for (let k = j; k < j + 5; k++) {
			namesCombinations	.push(NAMES[k]);
		}

		result[++power] = namesCombinations	;
	}

	return result;
})();


function _help (namesCombinations, result) {

	for (var i = 0; i < ; i++) {



	}
}



function _help2 (same, different, namesCombinations, result) {

		let suitPointer = 0;

		for (var j = 0; j < same; j++) {
			namesCombinations[j] += SUITS[suitPointer];
		}


		for (var j = same; j < same + different; j++) {
			namesCombinations[j] += SUITS[++suitPointer];
		}

}

