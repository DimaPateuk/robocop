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

export default function FullHouseTest () {
	testFunction(
		'1) Full House power - ACE & KING',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, SPADE),
				new Card(ACE, CLUB),
				new Card(KING, SPADE),
				new Card(KING, CLUB),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		763
	);

	testFunction(
		'2) Full House power - ACE & KING',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, SPADE),
				new Card(ACE, CLUB),
				new Card(KING, SPADE),
				new Card(KING, CLUB),
				new Card(TWO, DIAMOND),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		763
	);
}
