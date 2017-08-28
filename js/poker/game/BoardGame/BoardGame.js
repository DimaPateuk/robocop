import BoardCards from '../../cards/BoardCards.js';
import Deck from '../../cards/Deck.js';
import HandCards from '../../cards/HandCards.js';
import BoardGameUtils from './BoardGameUtils.js';

import {
	PRE_FLOP,
	FLOP,
	TERN,
	RIVER
} from '../../constants';

export default class BoardGame extends BoardGameUtils {

	constructor(players, smallBlind, bigBlind, ante = 0) {
		super();

		this.players = players.filter(player => player.bank > 0);
		this.smallBlind = smallBlind;
		this.bigBlind = bigBlind;
		this.ante = ante;
		this.dillerPosition = 0;
	}


	start () {
		this.deck = new Deck();
		this.pot = 0;
		this.playersInGame = {};
		this.playersBets = {
			[PRE_FLOP]: {},
			[FLOP]: {},
			[TERN]: {},
			[RIVER]: {},
		};

		this.players.forEach((player, index) => {
			const ante = player.ante(this.ante);
			this.pot += ante;

			this.playersInGame[player.id] = {
				index,
				player,
			};

			this.playersBets[PRE_FLOP][player.id] = 0;
			this.playersBets[FLOP][player.id] = 0;
			this.playersBets[TERN][player.id] = 0;
			this.playersBets[RIVER][player.id] = 0;

			player.setHandCards(new HandCards(this.deck));
		});

		if (this.players.length === 2) {
			this.startForTwoPlayers();
		}
	}

	startForTwoPlayers () {
		this.currentBet = this.bigBlind;
		const player = this.firstAfterDillerPlayerInGame;
		const bigBlind = player.bet(this.currentBet);
		this.pot += bigBlind;
		this.playersBets[PRE_FLOP][player.id] += this.currentBet;

		this.preFlop();

		// console.log('pot', this.pot);
		// console.log(this.playersInGame);
		// console.log(this.playersBets);
	}

	preFlop (startIndex) {
		this.gameStage = PRE_FLOP;
		this.bettingCycle(startIndex);

	}

	bettingCycle (startIndex) {
		this.foreEachPlayerFrom((player, index) => {
			const playerBetInCycle = this.playersBets[this.gameStage][player.id];
			const minimalBet = this.currentBet - playerBetInCycle;

			if (minimalBet < 0) {
				throw Error('minimalBet < 0');
			}
			console.log(minimalBet);
			console.log(this.playersBets[this.gameStage]);
			const decision = player.makeDecision(minimalBet, index, this.gameStage);

			this.playersBets[this.gameStage][player.id] += decision;
			this.pot += decision;

			this.currentBet = playerBetInCycle + decision;

		}, startIndex);

	}


}
