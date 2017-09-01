import {
	VALUES,
	HEART,
	DIAMOND,
	CLUB,
	SPADE,

	STRAIGHT_FLUSH_NAME,
	FOUR_OF_A_KIND_NAME,
	FULL_HOUSE_NAME,
	FLUSH_NAME,
	STRAIGHT_NAME,
	THREE_OF_AKIND_NAME,
	TWO_PAIRS_NAME,
	PAIR_NAME,
	HIGH_CARD_NAME,

	STRAIGHT_FLUSH_POWER,
	FOUR_OF_A_KIND_POWER,
	FULL_HOUSE_POWER,
	FLUSH_POWER,
	STRAIGHT_POWER,
	THREE_OF_AKIND_POWER,
	TWO_PAIRS_POWER,
	PAIR_POWER,
	HIGH_CARD_POWER,
} from '../constants';
import {
	separateCardsByNames,
	separateCardsBySuit,
	calculateStraight,
	getLastElementFromArr,
	getLastTwoElements,
} from './utils';
import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';
import sumBy from 'lodash/sumBy';

function filterFlush (names) {
	return names.length > 4 ? names : [];
}

export default class CardsInfo {
	constructor (cards) {
		if (cards) {
			this.parseCards(cards);
		}
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

		this.highCard = getLastElementFromArr(this.separatedCardsByNamesKeysArr);

		this.highCardValue = VALUES[this.highCard];

		this.fourOfAKind = this.separatedCardsByNamesArr
			.filter(cards => cards.length === 4);

		this.highFourOfAKindValue = getLastElementFromArr(this.fourOfAKind, { 0: {} })[0].value;

		if (this.highFourOfAKindValue) {
			const filteredCards = this.cards.filter(
				card => card.value !== this.highFourOfAKindValue
			);
			const kicker = sortBy(
				filteredCards,
				card => -card.value
			)[0] || { value: 0 };

			this.highFourOfAKindValue += kicker.value;
		}

		this.threeOfAKind = this.separatedCardsByNamesArr
			.filter(cards => cards.length == 3);

		const highThreeOfAKindValue = getLastElementFromArr(this.threeOfAKind, { 0: {} })[0].value;

		if (highThreeOfAKindValue) {
			const filteredCards = this.cards.filter(
				card => card.value !== highThreeOfAKindValue
			);
			const kickers = sortBy(
				filteredCards,
				card => -card.value
			).slice(0, 2);

			this.highThreeOfAKindValue = highThreeOfAKindValue + sumBy(kickers, card => card.value);
		}

		this.pair = this.separatedCardsByNamesArr
			.filter(cards => cards.length == 2);

		const highPairValue = getLastElementFromArr(this.pair, { 0: {} })[0].value;
		if (highPairValue) {
			const kickerSum = sumBy(
				sortBy(this.cards.filter(card => card.value !== highPairValue),
					card => -card.value)
					.slice(0, 3),
				card => card.value
			);
			this.highPairValue = highPairValue + kickerSum;
		}

		this.twoPairs = this.pair.length > 1 ? getLastTwoElements(this.pair) : [];

		this.highTwoPairsValue = this.twoPairs
			.map(arr => arr[0])
			.reduce((res, item) => res + item.value, 0);

		if (this.highTwoPairsValue) {
			const [[first], [second]] = this.twoPairs;
			const firstValue = first.value;
			const secondValue = second.value;
			const filteredCards = this.cards.filter(card => {
				return card.value !== firstValue && card.value !== secondValue;
			});
			const kicker = sortBy(
				filteredCards,
				card => -card.value
			)[0] || { value: 0 };

			this.highTwoPairsValue += kicker.value;
		}


		this.highFullHouseValue = this.pair.length && this.threeOfAKind.length ?
			highPairValue * 2 + highThreeOfAKindValue * 3 :
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

		this.highFlushValue = (
			getLastElementFromArr(
				sortBy(
					this.flushArray
						.map(flush => getLastElementFromArr(flush)),
					card => card.value
				)
			) || {})
			.value;

		this.straigh = calculateStraight(this.separatedCardsByNamesKeysArr);

		this.highStraighValue = VALUES[getLastElementFromArr(
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

		this.highStraightFlushValue = VALUES[getLastElementFromArr(
			sortBy(
				this.straightFlushArray
					.map(straightFlushs => getLastElementFromArr(straightFlushs))
					.map(straightFlush => getLastElementFromArr(straightFlush)),
				name => VALUES[name]
			)
		)];

		this.combinatoins = [
			[this.highStraightFlushValue, STRAIGHT_FLUSH_POWER, STRAIGHT_FLUSH_NAME],
			[this.highFourOfAKindValue, FOUR_OF_A_KIND_POWER, FOUR_OF_A_KIND_NAME],
			[this.highFullHouseValue, FULL_HOUSE_POWER, FULL_HOUSE_NAME],
			[this.highFlushValue, FLUSH_POWER, FLUSH_NAME],
			[this.highStraighValue, STRAIGHT_POWER, STRAIGHT_NAME],
			[this.highThreeOfAKindValue, THREE_OF_AKIND_POWER, THREE_OF_AKIND_NAME],
			[this.highTwoPairsValue, TWO_PAIRS_POWER, TWO_PAIRS_NAME],
			[this.highPairValue, PAIR_POWER, PAIR_NAME],
			[this.highCardValue, HIGH_CARD_POWER, HIGH_CARD_NAME],
		].filter(arr => arr[0]);

		this.heighCombinatoin = this.combinatoins[0] || [];

		this.heighCombinatoinInfo = {
			power: this.heighCombinatoin[1] + this.heighCombinatoin[0],
			name: this.heighCombinatoin[2],
		};

		return this.heighCombinatoinInfo;
	}
}
