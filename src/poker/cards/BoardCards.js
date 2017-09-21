export default class BoardCards {

	constructor (deck) {
		this.cards = [];
		this.deck = deck;
	}

	get flop () {
		return this.cards.slice(0, 3);
	}

	get turn () {
		return [this.cards[3]];
	}

	get river () {
		return [this.cards[4]];
	}

	drawFlop () {
		this.cards.push(this.deck.drawRandomCard());
		this.cards.push(this.deck.drawRandomCard());
		this.cards.push(this.deck.drawRandomCard());

		return this.flop;
	}

	drawTurn () {
		this.cards.push(this.deck.drawRandomCard());

		return this.turn;
	}

	drawRiver () {
		this.cards.push(this.deck.drawRandomCard());

		return this.river;
	}

	toStringCards (cards) {
		return cards.map(card => card.toString()).join(' | ');
	}

	toStringAll () {
		return this.toStringCards(this.cards);
	}

}
