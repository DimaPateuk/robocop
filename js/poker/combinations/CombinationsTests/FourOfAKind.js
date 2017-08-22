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

export default function FourOfAKind () {
	testFunction(
		'1) Four Of a Kind power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, HEART),
				new Card(ACE, SPADE),
				new Card(ACE, CLUB),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		813
	);

	testFunction(
		'2) Four Of a Kind power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(KING, DIAMOND),
				new Card(ACE, SPADE),
				new Card(ACE, CLUB),
				new Card(KING, CLUB),
				new Card(KING, HEART),
				new Card(KING, SPADE),
				new Card(ACE, HEART),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		813
	);
}
