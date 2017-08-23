import { getRandomInt } from '../utils/number';
import toInteger from 'lodash/toInteger';


import {
	CHECK,
	FOLD,
} from './constants';

let id = 0;

export default class Player {

	constructor (bank, playerName) {
		this.name = playerName;
		this.bank = bank;
		this.bankInGame = 0;
		this.handCards = null;
		this.id = id++;
	}

	win (value) {
		this.bankInGame = 0;
		this.bank += value;
	}

	bet (value) {
		this.bank -= value;
		this.bankInGame += value;

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
		return FOLD;
	}

	allIn () {
		return this.bet(this.bank);
	}

	makeDecision (currentBet, positionIndex) {
		const value = this.handCards.value;

		if (value > 17) {
			return this.allIn();
		}

		if (value > 10) {

			if (this.bankInGame === currentBet) {
				return this.check();
			}

			const bet = toInteger(currentBet * 1.5);

			if (bet > this.bank) {
				return this.allIn();
			}

			return this.bet(bet);
		}

		return this.fold();
	}

	setHandCards (handCards) {
		this.handCards = handCards;
	}

	clearHandCards () {
		this.handCards = null;
		this.bankInGame = 0;
	}
}
