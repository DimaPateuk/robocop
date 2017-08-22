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

export default function HighCardTest () {
	testFunction(
		'1) High Card power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(KING, DIAMOND),
				new Card(ACE, HEART),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		113
	);

	testFunction(
		'2) High Card power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(TWO, SPADE),
				new Card(THREE, SPADE),
				new Card(FOUR, SPADE),
				new Card(KING, DIAMOND),
				new Card(ACE, HEART),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		113
	);

	testFunction(
		'3) High Card power - KING',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(TWO, SPADE),
				new Card(THREE, SPADE),
				new Card(FOUR, SPADE),
				new Card(KING, DIAMOND),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		112
	);

	testFunction(
		'1) High Card compare - ACE vs KING',
		() => {
			const King = new CardsInfo([
				new Card(TWO, SPADE),
				new Card(THREE, SPADE),
				new Card(FOUR, SPADE),
				new Card(KING, DIAMOND),
			]).heighCombinatoinInfo.power;

			const Ace = new CardsInfo([
				new Card(TWO, SPADE),
				new Card(THREE, SPADE),
				new Card(FOUR, SPADE),
				new Card(KING, DIAMOND),
				new Card(ACE, HEART),
			]).heighCombinatoinInfo.power;

			return King < Ace;
		},
		true
	);
}

