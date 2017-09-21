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

export default function ThreeOfAKindTest () {
	testFunction(
		'1) Three of a kind power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(ACE, SPADE),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		413
	);

	testFunction(
		'2) Three of a kind compare - ACE equality',
		() => {
			const AceFirst = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(ACE, SPADE),
			]).heighCombinatoinInfo.power;

			const AceSecond = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(ACE, HEART),
			]).heighCombinatoinInfo.power;

			return AceFirst === AceSecond;
		},
		true
	);

	testFunction(
		'3) Three of a kind power - ACE and kiker TEN',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(ACE, SPADE),
				new Card(TEN, SPADE),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		422
	);

	testFunction(
		'4) Three of a kind power - ACE and kiker TEN & NINE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(ACE, SPADE),
				new Card(TEN, SPADE),
				new Card(NINE, SPADE),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		430
	);

	testFunction(
		'5) Three of a kind power - ACE and kiker TEN & NINE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(ACE, SPADE),
				new Card(TEN, SPADE),
				new Card(NINE, SPADE),
				new Card(EIGHT, DIAMOND),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		430
	);
}
