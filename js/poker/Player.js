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

		this.bankInGame += result;

		return result;
	}

	ante (value) {
		const result = this._bet(value);

		console.log('ante', this.name, result);

		return result;
	}

	makeDecision (gameInfo, next) {
		// setTimeout(() => {
			const result = this.decisionMaker.makeDecision(gameInfo, next);

			if (result === FOLD) {
				console.log('fold', this.name);
				next(FOLD);
				return;
			}

			next(this.bet(result));
		// }, 1000);


		// return this.bet(minimalBet);

		// if (this.handCards.value > 20) {
		// 	return this.bet(this.bank);
		// }

		// if (this.handCards.value > 15) {
		// 	const bet = Math.floor(minimalBet * 1.5);
		// 	return this.bet(bet);
		// }

		// if (this.handCards.value > 10 && minimalBet < bigBlind * 3) {
		// 	return this.bet(minimalBet);
		// }

		// console.log('fold', this.name);
		// return FOLD;

	}

	setHandCards (handCards) {
		this.handCards = handCards;
	}
}
