import CardsInfo from '../CardsInfo';
import Card from '../../cards/Card';
import {
	HEART,
	DIAMOND,
	CLUB,
	SPADE,
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
} from '../../constants';
import { testFunction } from '../../../utils/test';

export default function StraightFlushTest () {
	testFunction(
		'1) Straight Flush power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(TEN, SPADE),
				new Card(JACK, SPADE),
				new Card(QUEEN, SPADE),
				new Card(KING, SPADE),
				new Card(ACE, SPADE),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		913
	);

	testFunction(
		'2) Straight Flush power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(TEN, SPADE),
				new Card(JACK, SPADE),
				new Card(QUEEN, SPADE),
				new Card(KING, SPADE),
				new Card(ACE, SPADE),
				new Card(ACE, CLUB),
				new Card(ACE, HEART),
				new Card(ACE, DIAMOND),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		913
	);

	testFunction(
		'2) Straight Flush power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(TWO, SPADE),
				new Card(THREE, SPADE),
				new Card(FOUR, SPADE),
				new Card(FIVE, SPADE),
				new Card(ACE, SPADE),
				new Card(ACE, CLUB),
				new Card(ACE, HEART),
				new Card(ACE, DIAMOND),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		904
	);
}
