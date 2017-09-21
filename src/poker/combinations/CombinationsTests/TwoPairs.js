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

export default function TwoPairsTest () {
	testFunction(
		'1) Two Pairs power - ACE & KING',
		() => {
			const AceAndKing = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(KING, DIAMOND),
				new Card(KING, CLUB),
			]);

			return AceAndKing.heighCombinatoinInfo.power;
		},
		325
	);

	testFunction(
		'2) Two Pairs power - ACE & KING',
		() => {
			const AceAndKing = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(KING, DIAMOND),
			]);

			return AceAndKing.heighCombinatoinInfo.power;
		},
		actualResult => actualResult !== 325
	);

	testFunction(
		'3) Two Pairs compare - ACE & KING vs ACE & QUEEN',
		() => {
			const AceAndKing = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(KING, DIAMOND),
				new Card(KING, CLUB),
			]).heighCombinatoinInfo.power;

			const AceAndQueen = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(QUEEN, DIAMOND),
				new Card(QUEEN, CLUB),
			]).heighCombinatoinInfo.power;

			return AceAndKing > AceAndQueen;
		},
		true
	);

	testFunction(
		'4) Two Pairs compare - ACE equality',
		() => {
			const AceFirst = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
			]).heighCombinatoinInfo.power;

			const AceSecond = new CardsInfo([
				new Card(ACE, SPADE),
				new Card(ACE, CLUB),
			]).heighCombinatoinInfo.power;

			return AceFirst === AceSecond;
		},
		true
	);

	testFunction(
		'5) Two Pairs power - ACE & KING and kiker TEN',
		() => {
			const AceAndKing = new CardsInfo([
				new Card(ACE, DIAMOND),
				new Card(ACE, CLUB),
				new Card(KING, DIAMOND),
				new Card(KING, CLUB),
				new Card(TEN, CLUB),
				new Card(NINE, CLUB),
			]);

			return AceAndKing.heighCombinatoinInfo.power;
		},
		334
	);
}
