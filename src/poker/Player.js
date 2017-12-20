import { getRandomInt } from '../utils/number';
import toInteger from 'lodash/toInteger';
import DecisionMaker from './DecisionMakerForTest';

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

		if (this.bank <= 0) {
			throw Error('this.bank <= 0');
		}

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
			console.log(this.name, 'CHECK');
		} else {
			console.log(this.name, 'BET', result);
		}

		this.bankInGame += result;

		return result;
	}

	ante (value) {
		const result = this._bet(value);

		return result;
	}

	makeDecision (gameInfo, next) {
			console.log(`${this.name} | bank: ${this.bank} | bankInGame: ${this.bankInGame} | minimal bet: ${gameInfo.minimalBet}`)

			const result = this.decisionMaker.makeDecision(gameInfo, next);

			if (result === FOLD) {
				console.log(this.name, 'FOLD');
				next(FOLD);
				return;
			}

			next(this.bet(result));
	}

	setHandCards (handCards) {
		this.handCards = handCards;
	}
}
