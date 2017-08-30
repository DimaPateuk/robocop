import { getRandomInt } from '../utils/number';
import toInteger from 'lodash/toInteger';
import DecisionMaker from './DecisionMaker';

import {
	CHECK,
	FOLD,
	BET,
} from './constants';

let id = 0;

export default class Player {

	constructor (bank, playerName, decisionMaker = new DecisionMaker()) {
		this.name = playerName;
		this.bank = bank;
		this.bankInGame = 0;
		this.handCards = null;
		this.decisionMaker = decisionMaker;
		this.id = id++;
	}

	_bet (value) {
		if (this.bank - value < 0) {
			const result = this.bank;
			this.bank = 0;

			return result;
		}

		this.bank -= value;

		return value;

	}

	bet (value) {
		const result = this._bet(value);
		if (result === 0) {
			console.log('check', this.name);
		} else {
			console.log('bet', this.name, result);
		}
		return result;
	}

	ante (value) {
		const result = this._bet(value);

		console.log('ante', this.name, result);

		return result;
	}

	makeDecision (minimalBet, gameInfo) {
		const {
			index,
			gameStage,
		} = gameInfo;


		return this.bet(minimalBet);

		// if (minimalBet === 0) {
		// 	return this.bet(10);
		// } else {
		// 	return this.bet(minimalBet);
		// }
		// const decision = this.decisionMaker.makeDecision(currentBet, positionIndex, stage);

		// throw Error('wrong player decision');
	}

	setHandCards (handCards) {
		this.handCards = handCards;
	}
}
