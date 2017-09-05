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
	FOLD,
} from '../../constants';

import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';
import sumBy from 'lodash/sumBy';


let boardGameId = 0;
let gameId = 0;

export default class BoardGame extends BoardGameUtils {

	constructor (players, smallBlind, bigBlind, ante = 0) {
		super();

		this.id = boardGameId++;

		this.players = players.filter(player => player.bank > 0);
		this.smallBlind = smallBlind;
		this.bigBlind = bigBlind;
		this.ante = ante;
		this.dillerPosition = 0;
	}

	start () {
		console.log('------------------');
		console.log('game preparation');
		console.log('------------------');

		this.players = this.players.filter(player => player.bank > 0);
		if (this.players.length === 1) {
			console.log('ONLY ONE PLAYER IN GAME');
			return;
		}
		this.dillerPosition = this.getNextIndex(this.dillerPosition);
		this.gameId = gameId++;
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
			player.bankInGame = 0;
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
		} else {
			this.startMoreThenTwoPlayers();
		}
	}

	startMoreThenTwoPlayers () {
		console.log('------------------');
		console.log(`GAME ${this.gameId} started`);
		console.log('for more then two players');
		this.playersInGameArr.forEach(player => {
			console.log(player.name);
		});
		console.log('------------------');
		this.firstAfterDillerPlayerInGame.bet(this.bigBlind / 2);
		this.secondAfterDillerPlayerInGame.bet(this.bigBlind);
		this.pot += this.bigBlind + this.bigBlind / 2;
		this.playersBets[PRE_FLOP][this.firstAfterDillerPlayerInGame.id] += this.bigBlind / 2;
		this.playersBets[PRE_FLOP][this.secondAfterDillerPlayerInGame.id] += this.bigBlind;

		this.preFlop(this.getNextIndex(this.getNextIndex(this.dillerPosition)));

		if (this.playersInGameArr.length === 1) {
			return;
		}

		this.flop(this.getNextIndex(this.dillerPosition));

		if (this.playersInGameArr.length === 1) {
			return;
		}

		this.turn(this.getNextIndex(this.dillerPosition));

		if (this.playersInGameArr.length === 1) {
			return;
		}

		this.river(this.getNextIndex(this.dillerPosition));

		if (this.playersInGameArr.length === 1) {
			return;
		}

		this.showdownMoreThenTwoPlayers();
	}

	startForTwoPlayers () {
		console.log('------------------');
		console.log(`GAME ${this.gameId} started`);
		console.log('for two players');
		this.playersInGameArr.forEach(player => {
			console.log(player.name);
		});
		console.log('------------------');
		const player = this.firstAfterDillerPlayerInGame;
		const bigBlind = player.bet(this.bigBlind);
		this.pot += bigBlind;
		this.playersBets[PRE_FLOP][player.id] += this.bigBlind;


		this.preFlop();

		if (this.playersInGameArr.length === 1) {
			return;
		}

		this.flop(this.getNextIndex(this.dillerPosition));

		if (this.playersInGameArr.length === 1) {
			return;
		}

		this.turn(this.getNextIndex(this.dillerPosition));

		if (this.playersInGameArr.length === 1) {
			return;
		}

		this.river(this.getNextIndex(this.dillerPosition));

		if (this.playersInGameArr.length === 1) {
			return;
		}

		this.showdownForTwoPlayers();
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
		console.log('---------------------');

		const withHighCardCombination = this.playersInGameArr.map(player => {
			const heighCombinatoinInfo = new CardsInfo(this.boardCards.cards.concat(player.handCards.cards)).heighCombinatoinInfo;
			console.log(player.name, heighCombinatoinInfo);
			return {
				heighCombinatoinInfo,
				player,
				power: heighCombinatoinInfo.power,
			};
		});

		if (withHighCardCombination[0].power === withHighCardCombination[1].power) {

			this.players[0].bank += this.ante;
			this.players[0].bank += this.players[0].bankInGame;

			this.players[1].bank += this.ante;
			this.players[1].bank += this.players[1].bankInGame;


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

		console.log('--------------------');
		console.log('Game end');
		console.log(this.players[0].name, this.players[0].bank);
		console.log(this.players[1].name, this.players[1].bank);
		console.log('--------------------');
		console.log();

	}

	showdownMoreThenTwoPlayers () {
		console.log('---------------------');
		console.log('Game stage - "showdown For Two Players"');
		console.log(`board cards - ${this.boardCards.toStringAll()}`);
		this.playersInGameArr.forEach(player => {
			console.log(`${player.name} - ${player.handCards.toString()}`);
		});
		console.log('---------------------');

		const withHighCardCombination = this.playersInGameArr.map(player => {
			const heighCombinatoinInfo = new CardsInfo(this.boardCards.cards.concat(player.handCards.cards)).heighCombinatoinInfo;
			console.log(player.name, heighCombinatoinInfo);
			return {
				heighCombinatoinInfo,
				player,
				power: heighCombinatoinInfo.power,
			};
		});

		const compousedByPower = withHighCardCombination.reduce((res, player) => {
			if (!res[player.power]) {
				res[player.power] = [player];
			} else {
				res[player.power].push(player);
			}

			return res;
		}, {});

		const sortedByPower = sortBy(Object.entries(compousedByPower), ([power]) => parseInt(power, 10))
			.map(entry => entry[1]);


		sortedByPower.forEach((arrOfPlayers, index) => {

			const maxBankInGame = maxBy(arrOfPlayers, playerInfo => playerInfo.player.bankInGame);
			let winnerBank = this.anteInGame;

			const winnersBets = sumBy(arrOfPlayers, playerInfo => playerInfo.player.bankInGame);
			const withPartsInPersentWhatPlayerHasWon = arrOfPlayers
				.map(playerInfo => {
					const player = playerInfo.player;
					return {
						player,
						part: (player.bankInGame / winnersBets) || 0,
					};
				});

			this.anteInGame = 0;
			this.players.forEach(player => {
				const bankInGame = player.bankInGame;
				if (bankInGame > maxBankInGame) {
					winnerBank += maxBankInGame;
					player.bankInGame -= maxBankInGame;
					this.pot -= maxBankInGame;
				} else {
					winnerBank += bankInGame;
					player.bankInGame = 0;
					this.pot -= bankInGame;
				}
			});

			withPartsInPersentWhatPlayerHasWon.forEach(playerInfo => {
				const part = Math.floor(winnerBank * playerInfo.part);
				playerInfo.player.bank += part;
				winnerBank -= part;
			});

			withPartsInPersentWhatPlayerHasWon[0].player.bank += winnerBank;

			arrOfPlayers.forEach(playerInfo => playerInfo.player.bankInGame = 0);
		});


		console.log('total Bank In Game', sumBy(this.players, player => player.bank));

		this.players.forEach(player => console.log(player.name, player.bank));

	}

	winBecauseAllFolded (winner) {
		winner.bank += this.pot + this.anteInGame;

		console.log('---------------------');
		console.log('win Because All Folded');
		console.log('winner', winner.name);
		console.log(this.players[0].name, this.players[0].bank);
		console.log(this.players[1].name, this.players[1].bank);
		console.log('---------------------');
		console.log();
	}

	startStageBettingCycle (startIndex) {
		for (let continueBetting = true; continueBetting;) {
			console.log('-------');
			if (this.playersInGameArr.length === 1) {
				break;
			}

			const sortetByBank = sortBy(
				this.playersInGameArr,
				player => player.bank
			);
			if (sortetByBank[0].bank !== 0 && sortetByBank[1].bank === 0 ||
				sortetByBank[0].bank === 0) {
				break;
			}

			this.bettingCycle(startIndex);
			const cycleBets = Object.entries(this.playersBets[this.gameStage])
				.filter(([playerId]) => this.playersInGame[playerId])
				.map((entry) => entry[1]);
			continueBetting = !cycleBets.every((value) => value === cycleBets[0]);
		}

		if (this.playersInGameArr.length === 1) {
			this.winBecauseAllFolded(this.playersInGameArr[0]);
			return;
		}

	}

	bettingCycle (startIndex) {
		this.foreEachPlayerFromWithBank((player, index) => {

			if (this.playersInGameArr.length === 1 || player.bank === 0) {
				return;
			}

			const gameStage = this.gameStage;
			const playerBetInCycle = this.playersBets[gameStage][player.id];
			const boardCards = this.boardCards.cards;

			let minimalBet = this.currentBet - playerBetInCycle;
			if (this.currentBet > player.bank) {
				minimalBet = player.bank;
			}

			if (minimalBet < 0) {
				throw Error('minimalBet < 0');
			}

			const decision = player.makeDecision(minimalBet, {
				index,
				gameStage,
				boardCards,
				bigBlind: this.bigBlind,
			});

			if (decision === FOLD) {
				this.playersInGame[player.id] = null;
				return;
			}

			if (decision < minimalBet) {
				throw Error('decision < minimalBet');
			}

			this.playersBets[gameStage][player.id] += decision;
			this.pot += decision;

			const nextBet = playerBetInCycle + decision;
			if (nextBet > this.currentBet) {
				this.currentBet = nextBet;
			}

		}, startIndex);
	}


}
