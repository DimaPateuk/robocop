import { VALUES } from '../../constants';
import {
	separateCardsByNames,
	separateCardsBySuit,
	saveNamesCardsOneByOneIntoArr,
} from './utils';
import sortBy from 'lodash/sortBy';

export default class CardsInfo {
	constructor(cards) {
		this.parseCards(cards);
	}

	parseCards (cards) {
		this.cards = cards;

		this.separatedCardsByNames = separateCardsByNames(this.cards);
		this.separatedCardsByNamesKeysArr = sortBy(
			Object.keys(this.separatedCardsByNames),
			name => VALUES[card.name]
		);
		this.separatedCardsByNamesArr = this.separatedCardsByNamesKeysArr
			.map(cards => this.separatedCardsByNames[cards]));
		this.separatedCardsBySuit = separateCardsBySuit(this.cards);
		this.separatedCardsBySuitArr = Object
			.keys(this.separatedCardsBySuit)
			.map(cards => this.separatedCardsBySuit[cards]);

		this.fourOfAKind = this.separatedCardsByNamesArr
			.filter(cards => cards.length === 4);

		this.threeOfAKind = this.separatedCardsByNamesArr
			.filter(cards => cards.length === 3);

		this.pair = this.separatedCardsByNamesArr
			.filter(cards => cards.length === 2);

		this.twoPairs = this.pair.length > 1 : this.pair : [];

		this.fullHouse = this.pair.length && this.threeOfAKind.length ?
			[this.pair, this.threeOfAKind] :
			[];

		this.flush = this.separatedCardsBySuitArr
			.filter(cards => cards.length > 4);

		this.straigh = this.calculateStraight(this.separatedCardsByNamesKeysArr)

		this.straignFlush = ??

	}

	calculateStraight (separatedCardsByNamesKeysArr) {
		const result = [];

		for (var i = 0; i < separatedCardsByNamesKeysArr.length; i++) {
			saveNamesCardsOneByOneIntoArr(
				separatedCardsByNamesKeysArr,
				i,
				5,
				result
			);
		}

		return result;
	}
}
