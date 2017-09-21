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

export default function FlustTest () {
	testFunction(
		'1) Flush power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(TWO, SPADE),
				new Card(EIGHT, SPADE),
				new Card(NINE, SPADE),
				new Card(JACK, SPADE),
				new Card(ACE, SPADE),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		613
	);

	testFunction(
		'2) Flush compare - KING vs ACE',
		() => {
			const King = new CardsInfo([
				new Card(EIGHT, SPADE),
				new Card(TEN, SPADE),
				new Card(JACK, SPADE),
				new Card(QUEEN, SPADE),
				new Card(KING, SPADE),
			]).heighCombinatoinInfo.power;

			const Ace = new CardsInfo([
				new Card(TWO, SPADE),
				new Card(THREE, CLUB),
				new Card(FOUR, CLUB),
				new Card(FIVE, CLUB),
				new Card(SIX, CLUB),
				new Card(ACE, CLUB),
			]).heighCombinatoinInfo.power;

			return Ace > King;
		},
		true
	);
}
