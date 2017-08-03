import { getRandomInt } from '../utils/number';
import { names, suits } from './constants';
import Card from './Card';


class Deck {
	constructor() {
		this._cards = {};
		for (let i = 0; i < names.length; i++) {
			for (let j = 0; j < suits.length; j++) {
				this._cards[names[i] + suits[j]] = new Card(names[i], suits[j]);
			}
		}
	}

	getNamesOfCardsThatRemain() {
		return Object.keys(this._cards);
			.filter(item => this._card[item]);
	}

	getRandomCard () {
		const namesOfCсardsThatRemain = this.getNamesOfCardsThatRemain();
		const index = getRandomInt(0, namesOfCсardsThatRemain.length);
		const nameRandonCard = namesOfCсardsThatRemain[index];
		const result = this._cards[nameRandonCard];

		this._cards[nameRandonCard] = null;

		return result;

	}
}

export default Deck;