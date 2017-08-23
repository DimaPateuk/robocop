import { getRandomInt } from '../utils/number';

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

	makeDecision (currentBet) {

		const decision = getRandomInt(0, 3);

	}

	setHandCards (handCards) {
		this.handCards = handCards;
	}

	clearHandCards () {
		this.handCards = null;
		this.bankInGame = 0;
	}
}
