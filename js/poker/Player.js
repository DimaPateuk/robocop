import { getRandomInt } from '../utils/number';
import toInteger from 'lodash/toInteger';


import {
	CHECK,
	FOLD,
} from './constants';

let id = 0;

export default class Player {

	constructor (bank, playerName, DecisionMaker) {
		this.name = playerName;
		this.bank = bank;
		this.bankInGame = 0;
		this.handCards = null;
		this.decisionMaker = DecisionMaker;
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
		console.log(this.name, FOLD);
		return FOLD;
	}

	allIn () {
		return this.bet(this.bank);
	}

	makeDecision (currentBet, positionIndex, stage) {
		this.decisionMaker.makeDecision(currentBet, positionIndex, stage);
	}

	setHandCards (handCards) {
		this.handCards = handCards;
	}

	clearHandCards () {
		this.handCards = null;
		this.bankInGame = 0;
	}
}
