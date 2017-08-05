import Card from './Card';
import { NAMES, SUITS } from './constants.js'

export const makeDeckCards = (function (names, suits) {
		return function () {
			const result = {};
			for (let i = 0; i < names.length; i++) {
				for (let j = 0; j < suits.length; j++) {
					result[names[i] + suits[j]] = new Card(names[i], suits[j]);
				}
			}

			return result;
		}
})(NAMES, SUITS);