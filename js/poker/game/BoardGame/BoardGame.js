import BoardCards from '../../cards/BoardCards.js';
import Deck from '../../cards/Deck.js';
import HandCards from '../../cards/HandCards.js';
import BoardGameUtils from './BoardGameUtils.js';
import CardsInfo from '../../combinations/CardsInfo';

import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
} from '../../constants';

import sortBy from 'lodash/sortBy';

export default class BoardGame extends BoardGameUtils {

	constructor (players, smallBlind, bigBlind, ante = 0) {
		super();

		this.cardsInfo = new CardsInfo();

		this.players = players.filter(player => player.bank > 0);
		this.smallBlind = smallBlind;
		this.bigBlind = bigBlind;
		this.ante = ante;
		this.dillerPosition = 0;
	}

	start () {
		this.deck = new Deck();
		this.boardCards = new BoardCards(this.deck);
		this.pot = 0;
		this.anteInGame = 0;
		this.playersInGame = {};
		this.playersBets = {
			[PRE_FLOP]: {},
			[FLOP]: {},
			[TURN]: {},
			[RIVER]: {},
		};
		this.stageCards = {
			[PRE_FLOP]: [],
			[FLOP]: [],
			[TURN]: [],
			[RIVER]: [],
		};

		this.players.forEach((player, index) => {
			const ante = player.ante(this.ante);
			this.anteInGame += ante;

			this.playersInGame[player.id] = {
				index,
				player,
			};

			this.playersBets[PRE_FLOP][player.id] = 0;
			this.playersBets[FLOP][player.id] = 0;
			this.playersBets[TURN][player.id] = 0;
			this.playersBets[RIVER][player.id] = 0;

			player.setHandCards(new HandCards(this.deck));
		});

		if (this.players.length === 2) {
			this.startForTwoPlayers();
		}
	}

	startForTwoPlayers () {
		const player = this.firstAfterDillerPlayerInGame;
		const bigBlind = player.bet(this.bigBlind);
		this.pot += bigBlind;
		this.playersBets[PRE_FLOP][player.id] += this.bigBlind;

		this.preFlop();

		this.flop(this.getNextIndex(this.dillerPosition));

		this.turn(this.getNextIndex(this.dillerPosition));

		this.river(this.getNextIndex(this.dillerPosition));

		this.showdownForTwoPlayers();
		// console.log('pot', this.pot);
		// console.log(this.playersInGameArr);
		// console.log(this.playersBets);
	}

	preFlop (startIndex) {
		this.gameStage = PRE_FLOP;
		this.currentBet = this.bigBlind;
		console.log('---------------------');
		console.log('Game stage - "pre flop"');
		console.log(`current bet - ${this.currentBet}`);
		console.log('---------------------');
		this.startStageBettingCycle(startIndex);
	}

	flop (startIndex) {
		this.gameStage = FLOP;
		this.currentBet = 0;
		this.stageCards[this.gameStage] = this.boardCards.drawFlop();

		console.log('---------------------');
		console.log('Game stage - "flop"');
		console.log(`cards - ${this.boardCards.toStringCards(this.boardCards.flop)}`);
		console.log('---------------------');
		this.startStageBettingCycle(startIndex);
	}

	turn (startIndex) {
		this.gameStage = TURN;
		this.currentBet = 0;
		this.stageCards[this.gameStage] = this.boardCards.drawTurn();
		console.log('---------------------');
		console.log('Game stage - "turn"');
		console.log(`cards - ${this.boardCards.toStringCards(this.boardCards.turn)}`);
		console.log('---------------------');
		this.startStageBettingCycle(startIndex);
	}

	river (startIndex) {
		this.gameStage = RIVER;
		this.currentBet = 0;
		this.stageCards[this.gameStage] = this.boardCards.drawRiver();
		console.log('---------------------');
		console.log('Game stage - "river"');
		console.log(`cards - ${this.boardCards.toStringCards(this.boardCards.river)}`);
		console.log('---------------------');
		this.startStageBettingCycle(startIndex);
	}

	showdownForTwoPlayers () {
		console.log('---------------------');
		console.log('Game stage - "showdown For Two Players"');
		console.log(`board cards - ${this.boardCards.toStringAll()}`);
		console.log(`${this.players[0].name} - ${this.players[0].handCards.toString()}`);
		console.log(`${this.players[1].name} - ${this.players[1].handCards.toString()}`);
		console.log(`board cards - ${this.boardCards.toStringAll()}`);
		console.log('---------------------');

		const withHighCardCombination = this.playersInGameArr.map(player => {
			const heighCombinatoinInfo = this.cardsInfo.parseCards(this.boardCards.cards.concat(player.handCards.cards));
			console.log(player.name, heighCombinatoinInfo);
			return {
				heighCombinatoinInfo,
				player,
				power: heighCombinatoinInfo.power
			};
		});

		if (withHighCardCombination[0].power === withHighCardCombination[1].power) {

		} else {
			let winner;
			let loser;
			if (withHighCardCombination[0].power > withHighCardCombination[1].power) {
				winner = withHighCardCombination[0].player;
				loser = withHighCardCombination[1].player;
			} else {
				winner = withHighCardCombination[1].player;
				loser = withHighCardCombination[0].player;
			}

			winner.bank += this.anteInGame + winner.bankInGame;
			this.pot -= winner.bankInGame;

			if (winner.bankInGame < loser.bankInGame) {
				winner.bank += winner.bankInGame;
				this.pot -= winner.bankInGame;
				loser.bank += this.pot;
			} else {
				winner.bank += this.pot;
			}
		}

		console.log(withHighCardCombination);
	}

	startStageBettingCycle (startIndex) {
		for (let continueBetting = true; continueBetting;) {
			this.bettingCycle(startIndex);
			const cycleBets = Object.entries(this.playersBets[this.gameStage])
				.filter(([playerId]) => this.playersInGame[playerId])
				.map((entry) => entry[1]);
			continueBetting = !cycleBets.every((value) => value === cycleBets[0]);
		}
	}

	bettingCycle (startIndex) {
		this.foreEachPlayerFromWithBank((player, index) => {
			const gameStage = this.gameStage;
			const playerBetInCycle = this.playersBets[gameStage][player.id];
			const minimalBet = this.currentBet - playerBetInCycle;
			const boardCards = this.boardCards.cards;

			if (minimalBet < 0) {
				throw Error('minimalBet < 0');
			}

			const decision = player.makeDecision(minimalBet, {
				index,
				gameStage,
				boardCards,
			});

			this.playersBets[gameStage][player.id] += decision;
			this.pot += decision;

			this.currentBet = playerBetInCycle + decision;

		}, startIndex);
	}


}
