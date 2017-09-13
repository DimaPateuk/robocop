import DecisionMaker from './DecisionMaker';
import {
	CHECK,
	FOLD,
	CALL,
	BET,
	ALL_IN,
	RAISE,
} from './constants';

export default class DecisionMakerForTest extends DecisionMaker {
	constructor (decisions) {
		super();
		this.decisions = decisions;
	}

	makeDecision (gameInfo, next) {
		const {
			index,
			minimalBet,
			gameStage,
			boardCards,
			bigBlind,
		} = gameInfo;


		if (minimalBet === CHECK) {
			return CHECK;
		}

		return minimalBet;
	}
}
