export default class BoardCards {

	constructor(deck) {
		this.cards = [];
		this.deck = deck;
	}

	get flop() {
		return this._toString(this.cards.slice(0, 3));
	}

	get turn() {
		return this.cards[3];
	}

	get river() {
		return this.cards[4];
	}

	showFlop() {
		this.cards.push(this.deck.drawRandomCard());
		this.cards.push(this.deck.drawRandomCard());
		this.cards.push(this.deck.drawRandomCard());

		return this.flop;
	}

	showTurn() {
		this.cards.push(this.deck.drawRandomCard());

		return this.turn;
	}

	showRiver() {
		this.cards.push(this.deck.drawRandomCard());

		return this.river;
	}

	_toString(cards) {
		return cards.map(card => card.toString()).join(' | ');
	}

	toString() {
		return this._toString(this.cards);
	}

}