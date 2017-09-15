import { getRandomInt } from '../../utils/number';
import {
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
	NAMES,
	SUITS
} from '../constants';

import Card from './Card';

class Deck {

	static MakeDeckCards(exclude = []) {
		const result = {};
		for (let i = 0; i < NAMES.length; i++) {
			for (let j = 0; j < SUITS.length; j++) {
				const newCard = new Card(NAMES[i], SUITS[j]);

				if (exclude.some(card => card.hash === newCard.hash)) continue;

				result[NAMES[i] + SUITS[j]] = newCard;
			}
		}

		return result;
	}

	static DrawRandomCard (exclude = []) {
		for (let continueDraw = true; continueDraw;) {
			const randomSuit = SUITS[getRandomInt(0, SUITS.length - 1)];
			const randomName = NAMES[getRandomInt(0, NAMES.length - 1)];
			const hash = randomName + randomSuit;

			if (!exclude.some(card => card.hash === hash)) {
				return new Card(randomName, randomSuit);
			}
		}

	}
	static DrawRandomCards (count, exclude = []) {
		const randomCards = [];

		for (let i = cards.length; i < maxCardCount; i++) {
			randomCards.push(Deck.DrawRandomCard(cards.concat(randomCards)));
		}

		return randomCards;
	}

	constructor (cards = Deck.MakeDeckCards()) {
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

	getNamesOfCardsThatRemain () {
		return Object.keys(this.cards)
			.filter(item => this.cards[item]);
	}

	drawRandomCard () {
		const namesOfCсardsThatRemain = this.getNamesOfCardsThatRemain();
		const index = getRandomInt(0, namesOfCсardsThatRemain.length - 1);
		const nameRandonCard = namesOfCсardsThatRemain[index];
		const result = this.cards[nameRandonCard];

		this.cards[nameRandonCard] = null;

		this.remainCard[result.name]--;
		this.remainCard[result.suit]--;

		return result;

	}

	checkCard (name = '', suit = '') {
		return this.cards[name + suit];
	}

	getRemainCombination (combination) {

	}
}

export default Deck;
