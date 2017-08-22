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

export default function StraighTest () {
	testFunction(
		'1) Straigh power - heigh SIX',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(SIX, SPADE),
				new Card(TWO, SPADE),
				new Card(THREE, SPADE),
				new Card(FIVE, SPADE),
				new Card(FOUR, HEART),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		505
	);

	testFunction(
		'2) Straigh power - heigh FIVE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(FIVE, SPADE),
				new Card(TWO, CLUB),
				new Card(THREE, SPADE),
				new Card(ACE, SPADE),
				new Card(FOUR, HEART),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		504
	);
}
