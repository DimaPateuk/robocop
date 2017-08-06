import { getRandomInt } from '../utils/number'

import {
	CHECK,
} from './constants';

export default class Player {

	constructor(bank, playerName) {
		this.name = playerName;
		this.bank = bank;
		this.bankInGame = 0;
		this.handCards = null;
	}

	bet (vlaue) {
		this.bank -= value;

		return value;
	}

	check() {
		return CHECK;
	}

	fold () {
		return 0;
	}

	allIn () {
		return this.bet(this.bank);
	}

	makeDecision (currentBet) {

		const decision = getRandomInt(0, 3);

		switch(decision) {
			case 0: return this.bet(this.bankInGame - currentBet); // call big blind
		}

	}

	setHandCards (handCards) {
		this.handCards = handCards;
	}

	clearHandCards () {
		this.handCards = null;
		this.bankInGame = 0;
	}
}