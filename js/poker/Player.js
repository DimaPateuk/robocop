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

	win (value) {
		this.bankInGame = 0;
		this.bank += value;
	}

	bet (value) {
		const tmp = this.bank - value;
		if (tmp < 0) {

		} else {
			this.bank -= value;
			this.bankInGame += value;

		}

		return value;
	}

	ante (value) {
		this.bank -= value;

		return value;
	}

	check () {
		return CHECK;
	}

	fold () {
		console.log(this.name, FOLD);
		return FOLD;
	}

	allIn () {
		return this.bet(this.bank);
	}

	makeDecision (currentBet, positionIndex, stage) {
		const decision = this.decisionMaker.makeDecision(currentBet, positionIndex, stage);

		if (decision === BET) {
			console.log('bet', this.name, currentBet);
			return this.bet(currentBet);
		}

		if (decision === CHECK) {
			console.log('check', this.name);
			return this.check();
		}

		if (decision === FOLD) {
			return this.fold();
		}

		throw Error('wrong player decision');
	}

	setHandCards (handCards) {
		this.handCards = handCards;
	}

	clearHandCards () {
		this.handCards = null;
		this.bankInGame = 0;
	}
}
