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
} from './utils';
import sortBy from 'lodash/sortBy';

export default class CardsInfo {
	constructor(cards = []) {
		this.parseCards(cards);
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

		this.threeOfAKind = this.separatedCardsByNamesArr
			.filter(cards => cards.length === 3);

		this.pair = this.separatedCardsByNamesArr
			.filter(cards => cards.length === 2);

		this.twoPairs = this.pair.length > 1 ? this.pair : [];

		this.fullHouse = this.pair.length && this.threeOfAKind.length ?
			[this.pair, this.threeOfAKind] :
			[];

		this.flush = {
			[HEART]: this.separatedCardsBySuit[HEART].length > 4 ? this.separatedCardsBySuit[HEART] : [],
			[DIAMOND]: this.separatedCardsBySuit[DIAMOND].length > 4 ? this.separatedCardsBySuit[DIAMOND] : [],
			[SPADE]: this.separatedCardsBySuit[SPADE].length > 4 ? this.separatedCardsBySuit[SPADE] : [],
			[CLUB]: this.separatedCardsBySuit[CLUB].length > 4 ? this.separatedCardsBySuit[CLUB] : [],
		};

		this.straigh = calculateStraight(this.separatedCardsByNamesKeysArr)

		this.straignFlush = {
			[HEART]: calculateStraight(this.separatedCardsBySuit[HEART].map(card => card.name)),
			[DIAMOND]: calculateStraight(this.separatedCardsBySuit[DIAMOND].map(card => card.name)),
			[SPADE]: calculateStraight(this.separatedCardsBySuit[SPADE].map(card => card.name)),
			[CLUB]: calculateStraight(this.separatedCardsBySuit[CLUB].map(card => card.name)),
		};
	}

}
