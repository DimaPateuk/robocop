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

export default function NAME () {
	testFunction(
		'1)  power - ACE',
		() => {
			const cardsInfo = new CardsInfo([
				new Card(ACE, DIAMOND),
			]);

			return cardsInfo.heighCombinatoinInfo.power;
		},
		(actualResult) => {}
	);
}
