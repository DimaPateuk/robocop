export default class HandCards {
	constructor (deck) {
		this.firstCard = deck.drawRandomCard();
		this.secondCard = deck.drawRandomCard();
		this.cards = [this.firstCard, this.secondCard];
	}


	toString () {
		return `${this.firstCard} | ${this.secondCard}`;
	}
}
