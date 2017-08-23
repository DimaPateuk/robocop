export default class HandCards {
	constructor (deck) {
		this.firstCard = deck.drawRandomCard();
		this.secondCard = deck.drawRandomCard();
		this.cards = [this.firstCard, this.secondCard];
	}


	get value () {
		return this.firstCard.value + this.secondCard.value;
	}

	toString () {
		return `${this.firstCard} | ${this.secondCard}`;
	}
}
