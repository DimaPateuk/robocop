import { getRandomInt } from '../utils/number';
import {
	ROYALFLUSH,
	TWO,
	THREE,
	FOUR,
	FIVE,
	SIX,
	SEVEN,
	EIGHT,
	NINE,
	TEN,
	JACK,
	QUEEN,
	KING,
	ACE,
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
} from './constants';

import { makeDeckCards } from './utils';
import Card from './Card';


class Deck {
	constructor(cards = makeDeckCards()) {
		this.cards = cards;

		this.remainCard = {
			[TWO]: 0,
			[THREE]: 0,
			[FOUR]: 0,
			[FIVE]: 0,
			[SIX]: 0,
			[SEVEN]: 0,
			[EIGHT]: 0,
			[NINE]: 0,
			[TEN]: 0,
			[JACK]: 0,
			[QUEEN]: 0,
			[KING]: 0,
			[ACE]: 0,
			[HEART]: 0,
			[DIAMOND]: 0,
			[CLUB]: 0,
			[SPADE]: 0,

		};

		const namesOfRemainCards = this.getNamesOfCardsThatRemain();

		for (let i = 0; i < namesOfRemainCards.length; i++) {
			const card = this.cards[namesOfRemainCards[i]];
			this.remainCard[card.name]++;
			this.remainCard[card.suit]++;
		}

	}

	getNamesOfCardsThatRemain() {
		return Object.keys(this.cards)
			.filter(item => this.cards[item]);
	}

	drawRandomCard () {
		const namesOfCсardsThatRemain = this.getNamesOfCardsThatRemain();
		const index = getRandomInt(0, namesOfCсardsThatRemain.length - 1);
		const nameRandonCard = namesOfCсardsThatRemain[index];
		const result = this.cards[nameRandonCard];

		this.cards[nameRandonCard] = null;

		this.remainCard[result.name]++;
		this.remainCard[result.suit]++;

		return result;

	}

	checkCard (name = '', suit = '') {
		return this.cards[name + suit];
	}

	getRemainCombination (combination) {

	}
}

export default Deck;