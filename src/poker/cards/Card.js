import { VALUES } from '../constants';

export default class Card {
	constructor (name, suit) {
		this.name = name;
		this.suit = suit;
		this.value = VALUES[name];
	}

	toString () {
		return `${this.name} ${this.suit}`;
	}

	toHash () {
		return `${this.name}${this.suit}`;
	}

	get hash () {
		return this.toHash();
	}
}
