import {
	PRE_FLOP,
	FLOP,
	TURN,
	RIVER,
	SHOWDOWN,
	FOLD,
} from '../../constants';

import BaseStage from './BaseStage';

import CardsInfo from '../../combinations/CardsInfo';

import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';
import sumBy from 'lodash/sumBy';

export default class Showdown extends BaseStage {
	constructor (boardGame) {
		super(boardGame);
		console.log('--------------- SHOWDOWN');
	}

	beforeStart () {}

	start () {
		const withHighCardCombination = sortBy(
			this.b.playersInGameArr.map(player => {
				const playerAndBoardCards = this.b.boardCards.cards.concat(player.handCards.cards);
				const { heighCombinatoinInfo } = new CardsInfo(playerAndBoardCards);

				return {
					heighCombinatoinInfo,
					player,
					power: heighCombinatoinInfo.power,
				};
			}), playerInfo => -playerInfo.power);


		console.log(`--------------- Cards on board ${this.b.boardCards.toStringAll()}`);
		console.log('--------------- Players cards');

		withHighCardCombination.forEach(({player, heighCombinatoinInfo}) => {
			console.log(`${player.name} | ${player.handCards.toString()} |`, heighCombinatoinInfo);
		});

		const compousedByPower = withHighCardCombination.reduce((res, playerInfo) => {
			if (!res[playerInfo.power]) {
				res[playerInfo.power] = [playerInfo];
			} else {
				res[playerInfo.power].push(playerInfo);
			}

			return res;
		}, {});

		const sortedByPower = sortBy(Object.entries(compousedByPower), ([power]) => -parseInt(power, 10))
			.map(entry => entry[1]);

		sortedByPower.forEach((arrOfPlayers, index) => {
			const maxBankInGame = maxBy(arrOfPlayers, 'player.bankInGame');
			let winnerBank = this.b.anteInGame;

			const winnersBets = sumBy(arrOfPlayers, 'player.bankInGame');
			const withPartsInPersentWhatPlayerHasWon = arrOfPlayers
				.map(playerInfo => {
					const player = playerInfo.player;

					return {
						player,
						part: (player.bankInGame / winnersBets) || 0,
					};
				});

			this.b.anteInGame = 0;
			this.b.players.forEach(player => {
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

			let bankWhichGivenToWinners = 0;
			withPartsInPersentWhatPlayerHasWon.forEach(playerInfo => {
				const part = Math.floor(winnerBank * playerInfo.part);

				playerInfo.player.bank += part;
				bankWhichGivenToWinners += part;
			});

			winnerBank -= bankWhichGivenToWinners;
			withPartsInPersentWhatPlayerHasWon[0].player.bank += winnerBank;

			arrOfPlayers.forEach(playerInfo => playerInfo.player.bankInGame = 0);
		});

		console.log('--------------- Bank after game');
		sortBy(this.b.players, player => -player.bank)
			.forEach(player => console.log(player.name, player.bank));

		this.offAll();
		console.log('--------------- Game END');
		this.b.emit('end');
	}

	get gameStage () {
		throw Error('get gameStage Showdown');
	}
}
