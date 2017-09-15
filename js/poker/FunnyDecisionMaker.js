import {
	CHECK,
	FOLD,
	CALL,
	BET,
	ALL_IN,
	RAISE,
} from './constants';
import CardsInfo from './combinations/CardsInfo';
import Deck from './cards/Deck';


const maxCardCount = 7;
const tryGetProbablyCombinationCount = 1;

export default class FunnyDecisionMaker {
	makeDecision (gameInfo) {
		const {
			index,
			player,
			bigBlind,
			gameStage,
			minimalBet,
			boardCards,
			oponentsCount,
		} = gameInfo;
		const cards = player.handCards.cards.concat(boardCards);

		for (let i = 0; i < tryGetProbablyCombinationCount; i++) {
			this.makeFakeGame(cards);
		}

	}

	makeFakeGame (cards) {

		Deck.DrawRandomCards(????, cards));
	}

}
