import DecisionMaker from './DecisionMaker';

import FunnyDecisionMaker from './FunnyDecisionMaker';

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
		this.funnyDecisionMaker = new FunnyDecisionMaker();
	}

	makeDecision (gameInfo, next) {
		const {
			index,
			player,
			bigBlind,
			minimalBet,
			gameStage,
			boardCards,
			oponentsCount,
		} = gameInfo;

		return this.funnyDecisionMaker.makeDecision(gameInfo);

	}
}
