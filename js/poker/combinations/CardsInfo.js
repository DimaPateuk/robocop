import {
	VALUES,
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
} from '../constants';
import {
	separateCardsByNames,
	separateCardsBySuit,
	calculateStraight,
	getLastElementFromArr,
} from './utils';
import sortBy from 'lodash/sortBy';

function filterFlush (names) {
	return names.length > 4 ? names : [];
}

function getLastCardName (arr = []) {
	const lastCard = getLastElementFromArr(arr);
	return lastCard && lastCard.name;
}

function getLastTwoCardsNames (arr = []) {
	const length = arr.length;
	const lastCard = arr[length - 1];
	const penultimateCard = arr[length - 2];

	return lastCard && penultimateCard ?
		[lastCard.name, penultimateCard.name] :
		[];
}

export default class CardsInfo {
	constructor (cards = []) {
		// /this.parseCards(cards);
	}

	parseCards (cards) {
		this.cards = cards;

		this.separatedCardsByNames = separateCardsByNames(this.cards);
		this.separatedCardsByNamesKeysArr = sortBy(
			Object.keys(this.separatedCardsByNames),
			name => VALUES[name]
		);
		this.separatedCardsByNamesArr = this.separatedCardsByNamesKeysArr
			.map(cards => this.separatedCardsByNames[cards]);
		this.separatedCardsBySuit = separateCardsBySuit(this.cards);
		this.separatedCardsBySuitArr = Object
			.keys(this.separatedCardsBySuit)
			.map(cards => this.separatedCardsBySuit[cards]);

		this.fourOfAKind = this.separatedCardsByNamesArr
			.filter(cards => cards.length === 4);

		this.heightFourOfAKindValue = VALUES[getLastCardName(this.fourOfAKind)];

		this.threeOfAKind = this.separatedCardsByNamesArr
			.filter(cards => cards.length === 3);

		this.heightThreeOfAKindValue = VALUES[getLastCardName(this.threeOfAKind)];

		this.pair = this.separatedCardsByNamesArr
			.filter(cards => cards.length === 2);

		this.heightPairValue = VALUES[getLastCardName(this.pair)];

		this.twoPairs = this.pair.length > 1 ? this.pair : [];

		this.heightTwoPairsValue = getLastTwoCardsNames(this.twoPairs);

		this.fullHouse = this.pair.length && this.threeOfAKind.length ?
			[this.pair, this.threeOfAKind] :
			[];

		this.heightFullHouseValue = this.fullHouse.length ?
			`${this.heightThreeOfAKind} | ${this.heightPair}` :
			undefined;

		this.flush = {
			[HEART]: filterFlush(this.separatedCardsBySuit[HEART]),
			[DIAMOND]: filterFlush(this.separatedCardsBySuit[DIAMOND]),
			[SPADE]: filterFlush(this.separatedCardsBySuit[SPADE]),
			[CLUB]: filterFlush(this.separatedCardsBySuit[CLUB]),
		};

		this.flushArray = [
			this.flush[HEART],
			this.flush[DIAMOND],
			this.flush[SPADE],
			this.flush[CLUB],
		].filter(item => item.length);

		this.heightFlushValue = (
			getLastElementFromArr(
				sortBy(
					this.flushArray
						.map(flush => getLastElementFromArr(flush)),
					card => card.value
				)
			) || {})
			.value;

		this.straigh = calculateStraight(this.separatedCardsByNamesKeysArr);

		this.heightStraigh = VALUES[getLastElementFromArr(
			getLastElementFromArr(this.straigh)
		)];

		this.straightFlush = {
			[HEART]: calculateStraight(this.separatedCardsBySuit[HEART].map(card => card.name)),
			[DIAMOND]: calculateStraight(this.separatedCardsBySuit[DIAMOND].map(card => card.name)),
			[SPADE]: calculateStraight(this.separatedCardsBySuit[SPADE].map(card => card.name)),
			[CLUB]: calculateStraight(this.separatedCardsBySuit[CLUB].map(card => card.name)),
		};

		this.straightFlushArray = [
			this.straightFlush[HEART],
			this.straightFlush[DIAMOND],
			this.straightFlush[SPADE],
			this.straightFlush[CLUB],
		].filter(item => item.length);

		this.heightStraightFlushValue = VALUES[getLastElementFromArr(
			sortBy(
				this.straightFlushArray
					.map(straightFlushs => getLastElementFromArr(straightFlushs))
					.map(straightFlush => getLastElementFromArr(straightFlush)),
				card => card.value
			)
		)];
	}

}
