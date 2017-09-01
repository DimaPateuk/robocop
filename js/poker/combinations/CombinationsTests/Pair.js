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

export default function PairTest () {
	testFunction(
		'1) Pair power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, HEART),
				new Card(ACE, CLUB),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		(actualResult) => actualResult !== 213
	);

	testFunction(
		'2) Pair power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, HEART),
				new Card(ACE, CLUB),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		213
	);

	testFunction(
		'3) Pair power - ACE and kiker TEN',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, HEART),
				new Card(ACE, CLUB),
				new Card(TEN, CLUB),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		222
	);

	testFunction(
		'4) Pair power - ACE and kiker TEN, NINE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, HEART),
				new Card(ACE, CLUB),
				new Card(TEN, CLUB),
				new Card(NINE, CLUB),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		230
	);

	testFunction(
		'4) Pair power - ACE and kiker TEN, NINE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, HEART),
				new Card(ACE, CLUB),
				new Card(TEN, CLUB),
				new Card(NINE, CLUB),
				new Card(EIGHT, CLUB),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		237
	);

	testFunction(
		'1) Pair compare - ACE vs KING',
		() => {
			const Ace = new CardsInfo([
				new Card(ACE, HEART),
				new Card(ACE, CLUB),
			]).heighCombinatoinInfo.power;

			const King = new CardsInfo([
				new Card(KING, HEART),
				new Card(KING, CLUB),
			]).heighCombinatoinInfo.power;

			return Ace > King;
		},
		true
	);
}
