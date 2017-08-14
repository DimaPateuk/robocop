export default class Card {
	constructor(name, suit) {
		this.name = name;
		this.suit = suit;
	}

	toString() {
		return `${this.name} ${this.suit}`;
	}

	toHash () {
		return `${this.name}${this.suit}`;
	}
}