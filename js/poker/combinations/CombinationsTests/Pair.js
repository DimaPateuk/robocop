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
import { testFunction } from '../../..//utils/test';

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
		'1) Pair compare - ACE & KING',
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
